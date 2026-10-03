'use client'

import { motion } from 'framer-motion'
import { Calendar, ChevronRight, Github, ExternalLink } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMotion } from '@/lib/motion'

export default function ProjectCard({ title, time, stack = [], points = [], icon, github, demo }) {
  const { item } = useMotion()
  return (
    <motion.div variants={item} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="h-full">
      <Card className="glass border-white/10 overflow-hidden h-full flex flex-col transition-[border-color,box-shadow] duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-black/30">
        <div className="relative h-28 bg-gradient-to-br from-white/[0.06] to-transparent border-b border-white/10">
          {time && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs text-zinc-300">
              <Calendar className="h-3 w-3" /> {time}
            </div>
          )}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-violet-600 grid place-items-center">{icon}</div>
            <h3 className="text-lg font-bold font-display leading-snug">{title}</h3>
          </div>
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          <ul className="space-y-2">
            {points.map((p, i) => (
              <li key={i} className="text-sm text-zinc-300 flex gap-2">
                <ChevronRight className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          {stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <Badge key={s} variant="secondary" className="bg-white/5 border border-white/10 text-zinc-200">
                  {s}
                </Badge>
              ))}
            </div>
          )}
          {(github || demo) && (
            <div className="mt-auto pt-5 flex gap-2">
              {demo && (
                <a href={demo} target="_blank" rel="noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
                  </Button>
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
                  </Button>
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
