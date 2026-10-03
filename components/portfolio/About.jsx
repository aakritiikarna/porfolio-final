'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Trophy, FileText, Terminal } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import SectionHead from './SectionHead'
import { Stagger } from './Reveal'
import { useMotion } from '@/lib/motion'

function Highlight({ icon, title, sub }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3 transition hover:border-violet-500/40 hover:bg-white/[0.07]">
      <div className="flex items-center gap-2 text-violet-300">
        {icon}
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      <div className="text-xs text-zinc-400 mt-0.5">{sub}</div>
    </div>
  )
}

export default function About() {
  const { item } = useMotion()
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker="About Me"
          title="Early career developer"
          subtitle="Clean, practical solutions and reliable software."
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <motion.div variants={item} className="min-w-0">
            <Card className="glass border-white/10 h-full">
              <CardContent className="p-7">
                <p className="text-zinc-300 leading-relaxed">
                  I&apos;m an early career developer who enjoys breaking down complex problems into clean, practical
                  solutions and turning ideas into functional, reliable software.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  I hold a B.Tech in Computer Science and Engineering from{' '}
                  <span className="text-violet-300">Vel Tech University, Chennai</span> (2022 – 2026), and worked as a
                  Frontend Developer Intern at <span className="text-violet-300">Sayathari Tech</span> in Kathmandu. My
                  projects span React, Node.js and Express, MongoDB, Django and Python.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Highlight icon={<Briefcase className="h-4 w-4" />} title="Frontend Intern" sub="Sayathari Tech" />
                  <Highlight icon={<GraduationCap className="h-4 w-4" />} title="CGPA 7.3" sub="B.Tech CSE" />
                  <Highlight icon={<Trophy className="h-4 w-4" />} title="Hackathon" sub="Top 3 · 24-hour event" />
                  <Highlight icon={<FileText className="h-4 w-4" />} title="Research paper" sub="ICEARS 2026" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} className="min-w-0">
            <Card className="glass border-white/10 h-full overflow-hidden relative">
              <CardContent className="p-7 relative">
                <div className="text-sm text-violet-300 mb-2 flex items-center gap-2 font-mono">
                  <Terminal className="h-4 w-4" />
                  ~/aakriti --whoami
                </div>
                <pre className="text-xs md:text-sm text-zinc-200 leading-7 whitespace-pre-wrap break-words font-mono">
                  {`{
  "name": "Aakriti Karna",
  "role": "Early career developer",
  "education": "B.Tech CSE, Vel Tech (2022-2026)",
  "experience": "Frontend Developer Intern",
  "languages": ["Python", "Java",
                "JavaScript", "SQL"],
  "frontend": ["React", "Next.js"],
  "backend": ["Node.js", "Express.js", "Django"],
  "available": "freelance work"
}`}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </Stagger>
      </div>
    </section>
  )
}
