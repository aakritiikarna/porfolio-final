'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, Sparkles, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { SITE } from '@/lib/site'
function ContactRow({ icon, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-4 group">
      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-violet-300 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition">
        {icon}
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</div>
        <div className="text-sm text-zinc-100 group-hover:text-violet-300 transition">{value}</div>
      </div>
    </div>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    inner
  )
}
const INITIAL_FORM = { name: '', email: '', message: '' }
export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      toast.success('Message sent! Aakriti will reply soon.')
      setForm(INITIAL_FORM)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker="Let's Talk"
          title="Get In Touch"
          subtitle="Have a role or a project in mind? Send me a message."
        />
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal className="min-w-0">
            <Card className="glass border-white/10 h-full">
              <CardContent className="p-7 space-y-5">
                <ContactRow icon={<Mail />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
                <ContactRow icon={<Phone />} label="Phone" value={SITE.phone} href={SITE.phoneHref} />
                {SITE.linkedin && (
                  <ContactRow
                    icon={<Linkedin />}
                    label="LinkedIn"
                    value={SITE.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                    href={SITE.linkedin}
                  />
                )}
                {SITE.github && (
                  <ContactRow
                    icon={<Github />}
                    label="GitHub"
                    value={SITE.github.replace(/^https?:\/\/(www\.)?/, '')}
                    href={SITE.github}
                  />
                )}

                <div className="rounded-xl bg-violet-500/10 border border-white/10 p-4">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-300" /> Available for freelance work
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">Open to development roles and freelance projects</div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <Card className="glass border-white/10 h-full">
              <CardContent className="p-7">
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Your Name</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="bg-white/5 border-white/10 focus-visible:ring-violet-500/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="bg-white/5 border-white/10 focus-visible:ring-violet-500/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Message</label>
                    <Textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about the role or idea…"
                      className="bg-white/5 border-white/10 focus-visible:ring-violet-500/40"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white border-0"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={loading ? 'sending' : 'idle'}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex items-center"
                      >
                        {loading ? (
                          'Sending…'
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
