import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE } from '@/lib/site'

const link = 'text-muted-foreground transition-colors hover:text-foreground'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:px-6 md:flex-row">
        <p>© {new Date().getFullYear()} Aakriti Karna</p>
        <div className="flex items-center gap-4">
          {SITE.github && (
            <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={link}>
              <Github className="h-4 w-4" />
            </a>
          )}
          {SITE.linkedin && (
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={link}>
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          <a href={`mailto:${SITE.email}`} aria-label="Email" className={link}>
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
