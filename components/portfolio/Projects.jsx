import SectionHead from './SectionHead'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '@/lib/projects'

// Project content and image paths live in lib/projects.js. Add a `demo` URL to a project to show a Live demo link.
export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead title="Projects" subtitle="Selected work, with source code on GitHub." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
