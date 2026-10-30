// Server-only email sending over SMTP (nodemailer).
// Never import this file from a client component: it reads secrets from process.env.
//
// This is an .mjs file so that scripts/test-email.mjs can import it directly with plain Node,
// as well as the Next.js API route.

import nodemailer from 'nodemailer'

// Variables that must be set for sending to be possible. SMTP_USER / SMTP_PASS are not listed because
// a few relays allow unauthenticated sending, but Gmail and most providers need both.
const REQUIRED = ['SMTP_HOST', 'CONTACT_TO_EMAIL']

export function getMailConfig(env = process.env) {
  const missing = REQUIRED.filter((key) => !String(env[key] || '').trim())
  if (missing.length) return { ok: false, missing }

  const port = Number(env.SMTP_PORT) || 587
  // Port 465 uses implicit TLS. Port 587 starts plain and upgrades with STARTTLS (secure: false is correct there).
  const secure = env.SMTP_SECURE ? String(env.SMTP_SECURE).toLowerCase() === 'true' : port === 465
  const user = String(env.SMTP_USER || '').trim()
  const pass = String(env.SMTP_PASS || '').replace(/\s+/g, '') // Gmail shows app passwords with spaces

  return {
    ok: true,
    config: {
      host: String(env.SMTP_HOST).trim(),
      port,
      secure,
      auth: user ? { user, pass } : undefined,
      to: String(env.CONTACT_TO_EMAIL).trim(),
      // Most providers (Gmail included) only accept a From address that belongs to the authenticated account.
      from: String(env.CONTACT_FROM_EMAIL || user || env.CONTACT_TO_EMAIL).trim(),
    },
  }
}

let cached = { key: '', transport: null }

function getTransport(config) {
  const key = JSON.stringify([config.host, config.port, config.secure, config.auth?.user, config.auth?.pass])
  if (cached.transport && cached.key === key) return cached.transport
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })
  cached = { key, transport }
  return transport
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Sends one email and only resolves if the SMTP server actually accepted it for the recipient.
async function deliver(config, message) {
  const info = await getTransport(config).sendMail({ from: `"Portfolio contact form" <${config.from}>`, to: config.to, ...message })
  if (!info.accepted || info.accepted.length === 0) {
    throw new Error('SMTP server did not accept the message for delivery')
  }
  return info
}

export async function sendContactEmail(config, { name, email, subject, message, phone, country }, meta = {}) {
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}${country ? ` (${country})` : ''}` : null,
    '',
    message,
  ].filter((l) => l !== null)

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#141821">
      <p style="margin:0 0 4px"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
      ${phone ? `<p style="margin:0 0 4px">Phone: ${escapeHtml(phone)}${country ? ` (${escapeHtml(country)})` : ''}</p>` : ''}
      <hr style="border:none;border-top:1px solid #e2e5eb;margin:14px 0">
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #e2e5eb;margin:14px 0">
      <p style="margin:0;color:#596071;font-size:12px">Sent from your portfolio contact form${meta.ip ? ` (IP ${escapeHtml(meta.ip)})` : ''}. Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`

  return deliver(config, {
    // replyTo lets you press "Reply" in your inbox and answer the visitor directly.
    replyTo: { name, address: email },
    subject: `[Portfolio] ${subject}`,
    text: lines.join('\n'),
    html,
  })
}

export async function sendTestEmail(config) {
  return deliver(config, {
    subject: '[Portfolio] Test email: your contact form is configured',
    text: 'If you can read this, your SMTP settings work and the portfolio contact form can reach your inbox.',
  })
}
