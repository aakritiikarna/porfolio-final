'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText, ArrowDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ProfilePhoto from './ProfilePhoto'
import { SITE } from '@/lib/site'

const EASE = [0.22, 1, 0.36, 1]

// The page's single orchestrated moment: the intro fades up once, in order, on load.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }

const iconLink = 'text-muted-foreground transition-colors hover:text-foreground'

export default function Hero() {
  return (
    <section id="home" className="pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 md:order-1 md:col-span-8">
            <motion.p variants={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              Available for freelance work
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-4 text-[clamp(3.25rem,9vw,5.75rem)] font-medium leading-[0.95] tracking-tight"
            >
              Aakriti Karna
            </motion.h1>

            <motion.p variants={item} className="mt-5 max-w-xl font-display text-xl leading-snug md:text-2xl">
              I build useful digital solutions with React, Next.js, Node.js and Python.
            </motion.p>

            <motion.p variants={item} className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              From a train delay prediction API to an inventory dashboard and an online code editor, I turn real
              problems into reliable, easy-to-use software. Previously a Frontend Developer Intern at Sayathari Tech.
            </motion.p>

            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#projects">
                  View projects <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={SITE.resume} target="_blank" rel="noreferrer">
                  <FileText className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
              <div className="ml-1 flex items-center gap-4">
                <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconLink}>
                  <Github className="h-5 w-5" />
                </a>
                <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#contact" aria-label="Contact me" className={iconLink}>
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <div className="order-1 md:order-2 md:col-span-4">
            <ProfilePhoto />
          </div>
        </div>
      </div>
    </section>
  )
}
