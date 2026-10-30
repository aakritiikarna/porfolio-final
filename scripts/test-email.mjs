// Sends one test email using your SMTP settings, so you can check credentials without using the website.
//   npm run test:email
// Reads .env.local (Node 20.6+ loads it via --env-file, see package.json).

import { getMailConfig, sendTestEmail } from '../lib/mailer.mjs'

const mail = getMailConfig()
if (!mail.ok) {
  console.error(`Missing environment variables: ${mail.missing.join(', ')}`)
  console.error('Copy .env.example to .env.local and fill in the values.')
  process.exit(1)
}

const { host, port, secure, to } = mail.config
console.log(`Sending a test email via ${host}:${port} (secure=${secure}) to ${to} ...`)
try {
  const info = await sendTestEmail(mail.config)
  console.log(`Accepted by the SMTP server for: ${info.accepted.join(', ')}`)
  console.log('Now check that inbox (and the spam folder). The server accepting it is not the same as it arriving.')
} catch (e) {
  console.error('Failed:', e?.code || '', e?.message || e)
  if (e?.code === 'EAUTH') console.error('Authentication failed. For Gmail you need an App Password, not your normal password.')
  process.exit(1)
}
