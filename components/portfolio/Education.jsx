import SectionHead from './SectionHead'

// Source: Education and Certifications sections of the resume.
const CERTS = [
  { name: 'Microsoft SQL Learning Path', issuer: 'Microsoft Learn' },
  { name: 'Oracle Java Foundations', issuer: 'Oracle' },
  { name: 'GitHub Foundations', issuer: 'GitHub' },
]

const COURSEWORK = ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks']

export default function Education() {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead title="Education and certifications" />
        <div className="grid gap-5 lg:grid-cols-5">
          <article className="rounded-2xl border border-border bg-card p-6 lg:col-span-3">
            <p className="text-sm text-muted-foreground">2022 – 2026 · Chennai</p>
            <h3 className="mt-1 text-xl font-medium">Vel Tech University</h3>
            <p className="mt-1 text-sm">B.Tech in Computer Science &amp; Engineering · CGPA 7.3</p>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Coursework">
              {COURSEWORK.map((s) => (
                <li key={s} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </article>

          <ul className="divide-y divide-border rounded-2xl border border-border bg-card lg:col-span-2">
            {CERTS.map((c) => (
              <li key={c.name} className="px-6 py-4">
                <h3 className="font-medium">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
