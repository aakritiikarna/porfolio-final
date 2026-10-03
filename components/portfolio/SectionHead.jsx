'use client'

import { Sparkles } from 'lucide-react'
import { Reveal } from './Reveal'

export default function SectionHead({ kicker, title, subtitle }) {
  return (
    <Reveal className="mb-10 text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-violet-300">
        <Sparkles className="h-3.5 w-3.5" /> {kicker}
      </div>
      <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight font-display">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl mx-auto text-zinc-400">{subtitle}</p>}
    </Reveal>
  )
}
