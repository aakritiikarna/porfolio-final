'use client'

import { motion } from 'framer-motion'
import { Trophy, BookOpen, Users, ListChecks } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import SectionHead from './SectionHead'
import { Stagger } from './Reveal'
import { useMotion } from '@/lib/motion'

// Source: Achievements & Leadership section of the resume.
const ACHIEVEMENTS = [
  {
    icon: <Trophy className="h-5 w-5" />,
    title: 'Hackathon: Top 3',
    text: 'Secured a Top-3 position in a 24-hour hackathon by developing and presenting a working backend solution in a competitive team environment.',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Research paper, ICEARS 2026',
    text: 'Authored and presented "AI-Driven Delay Forecasting Using CatBoost for Congested Railway Sections" at the 4th International Conference on Electronics and Renewable Systems.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Open source & community',
    text: 'Contributed to open-source projects and helped organize college technical events, collaborating with student developer communities.',
  },
  {
    icon: <ListChecks className="h-5 w-5" />,
    title: 'Problem solving',
    text: 'Strengthening Data Structures & Algorithms skills through LeetCode, focusing on Arrays, Strings, and Hashing.',
  },
]

export default function Achievements() {
  const { item } = useMotion()
  return (
    <section id="achievements" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead kicker="Highlights" title="Achievements & Leadership" />
        <Stagger className="grid md:grid-cols-2 gap-5">
          {ACHIEVEMENTS.map((a) => (
            <motion.div key={a.title} variants={item} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="glass border-white/10 h-full hover:border-violet-500/40 transition-colors duration-300">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-violet-500/15 border border-violet-500/30 grid place-items-center text-violet-300">
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold font-display">{a.title}</h3>
                    <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{a.text}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
