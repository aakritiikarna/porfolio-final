'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileText, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    // 'home' is not a nav link (the logo goes there) but is still tracked so the highlight clears at the top.
    ;['home', ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 border border-transparent transition-all duration-300 ${
            scrolled ? 'glass shadow-[0_8px_40px_-12px_rgba(139,92,246,0.3)]' : ''
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-violet-600 grid place-items-center font-black text-white shadow-lg font-display transition-transform duration-200 group-hover:scale-105">
              AK
            </div>
            <span className="hidden xl:block font-semibold tracking-tight font-display">
              Aakriti<span className="text-violet-400">.</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative px-2.5 xl:px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  active === n.id ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a href={SITE.resume} target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="border-white/15 bg-white/5 hover:bg-white/10 text-white">
                <FileText className="mr-1.5 h-4 w-4" /> Resume
              </Button>
            </a>
            <a href="#contact">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white border-0">
                Hire Me <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3"
            >
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors hover:bg-white/5 ${
                    active === n.id ? 'text-white bg-white/10' : 'text-zinc-300'
                  }`}
                >
                  {n.label}
                </a>
              ))}
              <a
                href={SITE.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 rounded-lg transition-colors"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
