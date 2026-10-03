'use client'

import { motion } from 'framer-motion'
import { Code2, Server, Layout, Database, GitBranch, Cpu } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import SectionHead from './SectionHead'
import { Stagger } from './Reveal'
import { useMotion } from '@/lib/motion'

// Source: Technical Skills section of the resume.
const SKILL_GROUPS = [
  { title: 'Languages', icon: <Code2 className="h-5 w-5" />, items: ['Python', 'Java', 'JavaScript', 'SQL'] },
  {
    title: 'Frontend',
    icon: <Layout className="h-5 w-5" />,
    items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend',
    icon: <Server className="h-5 w-5" />,
    items: ['Django', 'Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
  },
  { title: 'Databases', icon: <Database className="h-5 w-5" />, items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  {
    title: 'Tools',
    icon: <GitBranch className="h-5 w-5" />,
    items: ['Git', 'GitHub', 'VS Code', 'CI/CD Basics'],
  },
  {
    title: 'Core Concepts',
    icon: <Cpu className="h-5 w-5" />,
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },
]

export default function Skills() {
  const { item } = useMotion()
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead kicker="Tech Stack" title="Skills & Tools" />
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g) => (
            <motion.div key={g.title} variants={item}>
              <Card className="glass border-white/10 h-full hover:border-violet-500/40 transition group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 grid place-items-center text-violet-300 group-hover:scale-110 transition">
                      {g.icon}
                    </div>
                    <h3 className="font-semibold font-display">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((name) => (
                      <span
                        key={name}
                        className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-sm text-zinc-200 transition duration-200 hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-violet-500/10"
                      >
                        {name}
                      </span>
                    ))}
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
