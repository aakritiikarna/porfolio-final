'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText, Rocket } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import ProfilePhoto from './ProfilePhoto'
import { SITE } from '@/lib/site'
import { EASE, useMotion } from '@/lib/motion'

const STACK = ['React', 'Next.js', 'Node.js', 'Express.js', 'Python', 'MongoDB']

export default function Hero() {
  const { mobile } = useMotion()
  const y = mobile ? 12 : 20
  // Page-load entrance: each block fades up in sequence.
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
  const item = { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }

  return (
    <section id="home" className="relative pt-28 md:pt-40 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="md:col-span-8 order-2 md:order-1">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-zinc-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for freelance work · Open to development opportunities
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] font-display"
            >
              Hi, I&apos;m <span className="gradient-text">Aakriti Karna</span>
            </motion.h1>

            <motion.div variants={item} className="mt-3 text-xl md:text-2xl text-zinc-200 font-display font-medium">
              Early Career Developer
            </motion.div>

            <motion.p variants={item} className="mt-5 text-zinc-400 max-w-xl leading-relaxed">
              I enjoy breaking down complex problems into clean, practical solutions and turning ideas into functional,
              reliable software. Recently a Frontend Developer Intern at{' '}
              <span className="text-violet-300">Sayathari Tech</span>.
            </motion.p>

            <motion.div variants={item} className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono text-zinc-500">
              {STACK.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
              <a href="#projects">
                <Button className="bg-violet-600 hover:bg-violet-500 text-white border-0">
                  <Rocket className="mr-2 h-4 w-4" /> View My Work
                </Button>
              </a>
              <a href={SITE.resume} target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white/15 bg-white/5 hover:bg-white/10 text-white">
                  <FileText className="mr-2 h-4 w-4" /> Resume
                </Button>
              </a>
              <a href="#contact">
                <Button variant="ghost" className="text-zinc-300 hover:bg-white/5">
                  <Mail className="mr-2 h-4 w-4" /> Get In Touch
                </Button>
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex items-center gap-4 text-zinc-400">
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-white hover:-translate-y-0.5 transition"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white hover:-translate-y-0.5 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                className="hover:text-white hover:-translate-y-0.5 transition"
              >
                <Mail className="h-5 w-5" />
              </a>
              <Separator orientation="vertical" className="h-5 bg-white/10" />
              <span className="text-xs">{SITE.phone}</span>
            </motion.div>
          </motion.div>

          <div className="md:col-span-4 order-1 md:order-2">
            <ProfilePhoto />
          </div>
        </div>
      </div>
    </section>
  )
}
