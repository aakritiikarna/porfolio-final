// Contact form validation, shared by the browser (instant feedback) and the API route (the real check).
// Never trust the browser-side result: the server always validates again.

import { buildPhone } from './countries'

export const LIMITS = { name: 80, email: 254, subject: 120, message: 4000, messageMin: 10 }

// Pragmatic email check. A deliverability check is impossible without sending, so this only rejects obvious typos.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/

// Header values must never contain line breaks (email header injection).
const oneLine = (v) => String(v ?? '').replace(/[\r\n\u2028\u2029]+/g, ' ').trim()

// Returns { ok: true, value } or { ok: false, errors: { field: message } }.
export function validateContact(input) {
  const src = input && typeof input === 'object' ? input : {}
  const errors = {}

  const name = oneLine(src.name)
  const email = oneLine(src.email)
  const subject = oneLine(src.subject)
  const message = String(src.message ?? '').replace(/\r\n/g, '\n').trim()

  if (name.length < 2) errors.name = 'Enter your name.'
  else if (name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`

  if (!email) errors.email = 'Enter your email address.'
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

  if (subject.length < 3) errors.subject = 'Enter a subject.'
  else if (subject.length > LIMITS.subject) errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`

  if (message.length < LIMITS.messageMin) errors.message = `Write at least ${LIMITS.messageMin} characters.`
  else if (message.length > LIMITS.message) errors.message = `Message must be ${LIMITS.message} characters or fewer.`

  // Phone is optional. If a number is typed, the country must be valid too.
  let phone = ''
  let country = ''
  const rawPhone = String(src.phone ?? '').trim()
  if (rawPhone) {
    const built = buildPhone(src.country, rawPhone)
    if (!built.ok) errors.phone = built.error
    else {
      phone = built.e164
      country = built.country.iso2
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, value: { name, email, subject, message, phone, country } }
}
