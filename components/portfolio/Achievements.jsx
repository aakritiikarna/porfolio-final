import SectionHead from './SectionHead'

// Source: Achievements & Leadership section of the resume.
const ACHIEVEMENTS = [
  {
    title: 'Hackathon: Top 3',
    text: 'Secured a Top-3 position in a 24-hour hackathon by developing and presenting a working backend solution in a competitive team environment.',
  },
  {
    title: 'Research paper, ICEARS 2026',
    text: 'Authored and presented "AI-Driven Delay Forecasting Using CatBoost for Congested Railway Sections" at the 4th International Conference on Electronics and Renewable Systems.',
  },
  {
    title: 'Open source and community',
    text: 'Contributed to open-source projects and helped organize college technical events, collaborating with student developer communities.',
  },
  {
    title: 'Problem solving',
    text: 'Strengthening Data Structures & Algorithms skills through LeetCode, focusing on Arrays, Strings, and Hashing.',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead title="Achievements and leadership" />
        <div className="grid gap-5 md:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <article key={a.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-medium">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
