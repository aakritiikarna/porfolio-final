import SectionHead from './SectionHead'

// Facts come from the resume content already on the site.
const FACTS = [
  { label: 'Frontend Developer Intern', value: 'Sayathari Tech, Kathmandu' },
  { label: 'B.Tech CSE, CGPA 7.3', value: 'Vel Tech University, Chennai' },
  { label: 'Hackathon, Top 3', value: '24-hour event' },
  { label: 'Research paper', value: 'ICEARS 2026' },
]

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead title="About" />
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-prose space-y-4 leading-relaxed text-muted-foreground">
            <p>
              I like turning practical problems into software that is clear and dependable. My work covers React and
              Next.js on the front end, Node.js, Express and Python on the back end, and databases such as MongoDB,
              MySQL and PostgreSQL.
            </p>
            <p>
              I completed a B.Tech in Computer Science and Engineering at Vel Tech University, Chennai (2022 – 2026) and
              worked as a Frontend Developer Intern at Sayathari Tech in Kathmandu. I am interested in building digital
              solutions people actually use.
            </p>
          </div>

          <dl className="divide-y divide-border border-y border-border">
            {FACTS.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="font-medium">{f.label}</dt>
                <dd className="text-sm text-muted-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
