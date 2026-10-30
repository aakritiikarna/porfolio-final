import { CheckCircle2 } from 'lucide-react'

import SectionHead from './SectionHead'

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
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead title="Experience" />
        <div className="space-y-5">
          {EXPERIENCE.map((e) => (
            <article key={e.role + e.org} className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-[14rem_1fr] md:gap-10">
              <div>
                <h3 className="text-xl font-medium">{e.role}</h3>
                <p className="mt-1 text-sm">{e.org}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.time}</p>
                <p className="text-sm text-muted-foreground">{e.place}</p>
              </div>
              <ul className="space-y-2.5">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
