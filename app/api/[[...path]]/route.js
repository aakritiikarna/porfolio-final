import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getDb } from '@/lib/mongodb'
function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return res
}
export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
export async function GET(request, { params }) {
  const resolvedParams = await params
  const path = (resolvedParams?.path || []).join('/')
  try {
    if (path === '' || path === 'health') {
      return cors(NextResponse.json({ status: 'ok', service: 'aakriti-portfolio', time: new Date().toISOString() }))
    }
    if (path === 'messages') {
      const db = await getDb()
      const items = await db
        .collection('contact_messages')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray()
      return cors(NextResponse.json({ messages: items }))
    }
    return cors(NextResponse.json({ error: 'Not Found' }, { status: 404 }))
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return cors(NextResponse.json({ error: message }, { status: 500 }))
  }
}
export async function POST(request, { params }) {
  const resolvedParams = await params
  const path = (resolvedParams?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))
    if (path === 'contact') {
      const { name, email, message } = body || {}
      if (!name || !email || !message) {
        return cors(NextResponse.json({ error: 'name, email, message are required' }, { status: 400 }))
      }
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 200),
        message: String(message).slice(0, 4000),
        createdAt: new Date().toISOString(),
      }
      await db.collection('contact_messages').insertOne(doc)
      return cors(NextResponse.json({ ok: true, id: doc.id }))
    }
    return cors(NextResponse.json({ error: 'Not Found' }, { status: 404 }))
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return cors(NextResponse.json({ error: message }, { status: 500 }))
  }
}
