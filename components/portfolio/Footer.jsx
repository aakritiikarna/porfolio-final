import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE } from '@/lib/site'
export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-zinc-400">
        <div>
          © {new Date().getFullYear()} Aakriti Karna · Built with <span className="text-violet-300">Next.js</span> + ♥
        </div>
        <div className="flex items-center gap-3">
          {SITE.github && (
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {SITE.linkedin && (
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          <a href={`mailto:${SITE.email}`} aria-label="Email" className="hover:text-white transition">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
