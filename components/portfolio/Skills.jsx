import SectionHead from './SectionHead'

// Source: Technical Skills section of the resume.
const SKILL_GROUPS = [
  { title: 'Languages', items: ['Python', 'Java', 'JavaScript', 'SQL'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { title: 'Backend', items: ['Django', 'Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'] },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'CI/CD Basics'] },
  { title: 'Core concepts', items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead title="Skills and tools" />
        <dl className="divide-y divide-border border-y border-border">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-medium">{g.title}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((name) => (
                  <span key={name} className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground">
                    {name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
