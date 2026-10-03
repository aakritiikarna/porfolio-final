'use client'

import { motion } from 'framer-motion'
import { MapPin, Briefcase, CheckCircle2 } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SectionHead from './SectionHead'
import { Stagger } from './Reveal'
import { EASE, useMotion } from '@/lib/motion'

// Source: Experience section of the resume.
const EXPERIENCE = [
  {
    role: 'Frontend Developer Intern',
    org: 'Sayathari Tech',
    place: 'Kathmandu, Nepal · On-site',
    time: 'Jun 2026 – Sep 2026',
    points: [
      'Partnered with backend developers to integrate RESTful APIs, resolving recurring data synchronization issues between frontend and backend services.',
      'Built and maintained responsive, cross-browser user interfaces with HTML5, CSS3 and JavaScript across multiple device and browser combinations.',
      'Debugged and resolved 15+ UI issues across browsers and screen sizes, improving application stability and user experience.',
      'Streamlined page load performance and optimized component rendering to reduce client-side rendering time.',
    ],
    tags: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
  },
]

function TimelineItem({ side = 'left', role, org, place, time, points, tags }) {
  const { item, viewport } = useMotion()
  return (
    <motion.div
      variants={item}
      className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 mb-12 ${
        side === 'right' ? 'md:[&>div:first-child]:order-2' : ''
      }`}
    >
      <div className={`hidden md:block ${side === 'right' ? 'text-left' : 'text-right'}`}>
        <div className="text-violet-300 text-sm font-mono">{time}</div>
        <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5 justify-end md:justify-start">
          {side === 'left' && <MapPin className="h-3 w-3" />}
          {place}
        </div>
      </div>
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
          className="absolute -left-12 md:left-auto md:-translate-x-1/2 md:-ml-[14px] top-2 w-7 h-7 rounded-full bg-violet-600 grid place-items-center ring-4 ring-[#070617]"
        >
          <Briefcase className="h-3.5 w-3.5" />
        </motion.div>
        <Card className="glass border-white/10 hover:border-violet-500/40 transition">
          <CardContent className="p-6">
            <div className="md:hidden text-violet-300 text-xs font-mono mb-2">
              {time} · {place}
            </div>
            <h3 className="text-lg font-bold font-display">{role}</h3>
            <div className="text-zinc-400 text-sm">{org}</div>
            <ul className="mt-3 space-y-2">
              {points.map((p, idx) => (
                <li key={idx} className="text-sm text-zinc-300 flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="bg-white/5 border border-white/10 text-zinc-200 hover:bg-violet-500/20 transition"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { viewport } = useMotion()
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead kicker="Experience" title="Where I've Worked" />
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line draws downward as the section enters view */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-violet-500/30"
          />
          <Stagger>
            {EXPERIENCE.map((e, i) => (
              <TimelineItem key={e.role + e.org} side={i % 2 === 0 ? 'left' : 'right'} {...e} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
