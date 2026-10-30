import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getDb } from '@/lib/mongodb'
import { validateContact } from '@/lib/contactSchema'
import { getMailConfig, sendContactEmail } from '@/lib/mailer.mjs'
import { rateLimit } from '@/lib/rateLimit'

// Runs nodemailer and mongodb, so it must use the Node.js runtime (not Edge).
export const runtime = 'nodejs'

const MAX_BODY_BYTES = 20_000
const MIN_FILL_MS = 2_000 // a human cannot read and fill four fields faster than this

function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return res
}

const json = (body, status = 200) => NextResponse.json(body, { status })

function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for')
  return (fwd ? fwd.split(',')[0] : request.headers.get('x-real-ip') || 'unknown').trim()
}

// The contact endpoint is only meant to be called by this site's own page, so cross-site requests are refused.
function isSameOrigin(request) {
  const origin = request.headers.get('origin')
  if (!origin) return true // same-origin form posts from some browsers, and curl, send no Origin header
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}

export async function GET(request, { params }) {
  const path = ((await params)?.path || []).join('/')
  try {
    if (path === '' || path === 'health') {
      return cors(json({ status: 'ok', service: 'aakriti-portfolio', time: new Date().toISOString() }))
    }
    if (path === 'messages') {
      // Stored messages contain visitors' personal details, so this is off unless ADMIN_TOKEN is set,
      // and then requires "Authorization: Bearer <ADMIN_TOKEN>". It used to be public.
      const token = process.env.ADMIN_TOKEN
      if (!token) return json({ error: 'Not Found' }, 404)
      if (request.headers.get('authorization') !== `Bearer ${token}`) return json({ error: 'Unauthorized' }, 401)
      const db = await getDb()
      const items = await db
        .collection('contact_messages')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray()
      return json({ messages: items })
    }
    return cors(json({ error: 'Not Found' }, 404))
  } catch (e) {
    console.error('[api] GET failed:', e instanceof Error ? e.message : e)
    return json({ error: 'Something went wrong.' }, 500)
  }
}

export async function POST(request, { params }) {
  const path = ((await params)?.path || []).join('/')
  if (path !== 'contact') return cors(json({ error: 'Not Found' }, 404))

  try {
    if (!isSameOrigin(request)) return json({ error: 'Request not allowed.' }, 403)

    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) return json({ error: 'Message is too large.' }, 413)
    let body
    try {
      body = JSON.parse(raw)
    } catch {
      return json({ error: 'Invalid request.' }, 400)
    }

    const ip = clientIp(request)
    const limited = rateLimit(`contact:${ip}`)
    if (!limited.allowed) {
      const res = json({ error: 'Too many messages. Please try again in a few minutes.' }, 429)
      res.headers.set('Retry-After', String(limited.retryAfterSec))
      return res
    }

    // Spam traps: the "website" field is hidden from people (bots fill it), and the form reports when it was opened.
    const startedAt = Number(body?.startedAt)
    if (body?.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
      return json({ error: 'Your message could not be sent. Please try again.' }, 400)
    }

    const checked = validateContact(body)
    if (!checked.ok) return json({ error: 'Please fix the highlighted fields.', fields: checked.errors }, 400)

    const mail = getMailConfig()
    if (!mail.ok) {
      // Names only, never values.
      console.error(`[contact] Email is not configured. Missing env vars: ${mail.missing.join(', ')}`)
      return json({ error: 'The contact form is not set up yet. Please email me directly instead.' }, 503)
    }

    let emailed = false
    try {
      await sendContactEmail(mail.config, checked.value, { ip })
      emailed = true
    } catch (e) {
      console.error('[contact] Sending failed:', e?.code || '', e instanceof Error ? e.message : e)
    }

    // Optional archive: only when MONGO_URL is set. It never decides whether the visitor sees success.
    if (process.env.MONGO_URL) {
      try {
        const db = await getDb()
        await db.collection('contact_messages').insertOne({
          id: uuidv4(),
          ...checked.value,
          emailStatus: emailed ? 'sent' : 'failed',
          createdAt: new Date().toISOString(),
        })
      } catch (e) {
        console.error('[contact] Could not archive message:', e instanceof Error ? e.message : e)
      }
    }

    if (!emailed) {
      return json({ error: 'Your message could not be sent right now. Please try again, or email me directly.' }, 502)
    }
    return json({ ok: true })
  } catch (e) {
    console.error('[contact] Unexpected error:', e instanceof Error ? e.message : e)
    return json({ error: 'Something went wrong. Please try again.' }, 500)
  }
}
