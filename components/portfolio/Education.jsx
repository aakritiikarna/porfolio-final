'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Star, Award } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import SectionHead from './SectionHead'
import { Stagger } from './Reveal'
import { useMotion } from '@/lib/motion'

// Source: Education and Certifications sections of the resume.
const CERTS = [
  { name: 'Microsoft SQL Learning Path', issuer: 'Microsoft Learn' },
  { name: 'Oracle Java Foundations', issuer: 'Oracle' },
  { name: 'GitHub Foundations', issuer: 'GitHub' },
]

const COURSEWORK = ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks']

export default function Education() {
  const { item } = useMotion()
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead kicker="Background" title="Education & Certifications" />
        <Stagger className="grid lg:grid-cols-5 gap-6">
          <motion.div variants={item} className="lg:col-span-2">
            <Card className="glass border-white/10 h-full hover:border-violet-500/40 transition">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600 grid place-items-center shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-violet-300 font-mono">2022 – 2026</div>
                    <h3 className="font-bold text-lg mt-0.5 font-display">Vel Tech University</h3>
                    <div className="text-sm text-zinc-300">B.Tech in Computer Science &amp; Engineering</div>
                    <div className="text-xs text-zinc-400 mt-1">Chennai</div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-300">
                      <Star className="h-3 w-3 fill-emerald-400" /> CGPA · 7.3
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {COURSEWORK.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-1 gap-4 content-start">
            {CERTS.map((c) => (
              <motion.div key={c.name} variants={item}>
                <Card className="glass border-white/10 hover:border-violet-500/40 hover:-translate-y-0.5 transition duration-300">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-violet-500/15 border border-violet-500/30 grid place-items-center text-violet-300">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold font-display leading-snug">{c.name}</h4>
                      <div className="text-xs text-zinc-400 mt-0.5">{c.issuer}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
