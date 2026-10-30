import { Github, ExternalLink } from 'lucide-react'

import ProjectImage from './ProjectImage'

const linkClass =
  'inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded'

export default function ProjectCard({ title, period, summary, stack = [], github, demo, image }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-foreground/25">
      {/* Fixed 4:3 frame: every project image is cropped to the same size */}
      <div className="aspect-[4/3] overflow-hidden border-b border-border bg-muted">
        <ProjectImage title={title} image={image} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-medium leading-snug">{title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>

        {stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {stack.map((s) => (
              <li key={s} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                {s}
              </li>
            ))}
          </ul>
        )}

        {(github || demo || period) && (
          <div className="mt-auto flex items-center gap-5 pt-5">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className={linkClass} aria-label={`${title} on GitHub`}>
                <Github className="h-4 w-4" /> Code
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className={linkClass} aria-label={`${title} live demo`}>
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
            {period && <span className="ml-auto text-xs text-muted-foreground">{period}</span>}
          </div>
        )}
      </div>
    </article>
  )
}
