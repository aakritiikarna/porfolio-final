'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, Linkedin, Github, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import SectionHead from './SectionHead'
import { SITE } from '@/lib/site'
import { COUNTRIES, DEFAULT_COUNTRY_ISO2 } from '@/lib/countries'
import { validateContact, LIMITS } from '@/lib/contactSchema'

function ContactRow({ icon, label, value, href }) {
  return (
    <li>
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors group-hover:text-primary">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-muted-foreground">{label}</span>
          <span className="block truncate text-sm transition-colors group-hover:text-primary">{value}</span>
        </span>
      </a>
    </li>
  )
}

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

// Props that connect an input to its error message for assistive tech.
const a11y = (id, error) => (error ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {})

const INITIAL = { name: '', email: '', subject: '', country: DEFAULT_COUNTRY_ISO2, phone: '', message: '', website: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', text: '' }) // idle | sending | success | error
  const openedAt = useRef(0)

  // Sent to the server as a basic bot check (nobody fills in the form within seconds of opening the page).
  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status.type === 'sending') return

    const checked = validateContact(form)
    if (!checked.ok) {
      setErrors(checked.errors)
      setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' })
      return
    }
    setErrors({})
    setStatus({ type: 'sending', text: 'Sending your message…' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, startedAt: openedAt.current }),
      })
      const data = await res.json().catch(() => ({}))
      // Only a response that explicitly says ok:true means the email was actually sent.
      if (res.ok && data.ok === true) {
        setStatus({ type: 'success', text: `Message sent. Thank you, ${checked.value.name}. I will reply to ${checked.value.email}.` })
        setForm(INITIAL)
        return
      }
      if (data.fields) setErrors(data.fields)
      setStatus({ type: 'error', text: data.error || 'Your message could not be sent. Please try again.' })
    } catch {
      setStatus({ type: 'error', text: 'Could not reach the server. Check your connection and try again.' })
    }
  }

  const sending = status.type === 'sending'

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <SectionHead title="Get in touch" subtitle="Have a role or a project in mind? Send me a message and I will reply by email." />
            <ul className="space-y-4">
              <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
              <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value={SITE.phone} href={SITE.phoneHref} />
              {SITE.linkedin && (
                <ContactRow
                  icon={<Linkedin className="h-4 w-4" />}
                  label="LinkedIn"
                  value={SITE.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                  href={SITE.linkedin}
                />
              )}
              {SITE.github && (
                <ContactRow
                  icon={<Github className="h-4 w-4" />}
                  label="GitHub"
                  value={SITE.github.replace(/^https?:\/\/(www\.)?/, '')}
                  href={SITE.github}
                />
              )}
            </ul>
          </div>

          <form onSubmit={submit} noValidate className="relative space-y-4 rounded-2xl border border-border bg-card p-6 md:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <Input id="name" name="name" autoComplete="name" maxLength={LIMITS.name} value={form.name} onChange={set('name')} {...a11y('name', errors.name)} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={LIMITS.email}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set('email')}
                  {...a11y('email', errors.email)}
                />
              </Field>
            </div>

            <Field id="subject" label="Subject" error={errors.subject}>
              <Input id="subject" name="subject" maxLength={LIMITS.subject} value={form.subject} onChange={set('subject')} {...a11y('subject', errors.subject)} />
            </Field>

            {/* Country (ISO 3166-1 alpha-2) and dialing code come from lib/countries.js and are kept as separate values. */}
            <Field id="phone" label="Phone" optional error={errors.phone}>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,13rem)_1fr]">
                <select
                  id="country"
                  name="country"
                  aria-label="Country calling code"
                  value={form.country}
                  onChange={set('country')}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso2} value={c.iso2}>
                      {c.name} (+{c.dial})
                    </option>
                  ))}
                </select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={set('phone')}
                  {...a11y('phone', errors.phone)}
                />
              </div>
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <Textarea
                id="message"
                name="message"
                rows={5}
                maxLength={LIMITS.message}
                placeholder="Tell me about the role or idea"
                value={form.message}
                onChange={set('message')}
                {...a11y('message', errors.message)}
              />
            </Field>

            {/* Honeypot: hidden from people and assistive tech. Bots tend to fill it, and the server rejects those. */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
            </div>

            <Button type="submit" disabled={sending} className="w-full sm:w-auto">
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                </>
              ) : (
                <>
                  Send message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Live region so screen readers announce the result. Success text only appears after the server confirms sending. */}
            <div role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite" className="min-h-6 text-sm">
              {status.type === 'success' && (
                <p className="flex items-start gap-2 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {status.text}
                </p>
              )}
              {status.type === 'error' && (
                <p className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {status.text}{' '}
                    <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                      Email me directly
                    </a>
                  </span>
                </p>
              )}
              {status.type === 'sending' && <p className="text-muted-foreground">{status.text}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
