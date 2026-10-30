import SectionHead from './SectionHead'
import { findCountry } from '@/lib/countries'
import { TESTIMONIALS, SAMPLE_TESTIMONIALS } from '@/lib/testimonials'

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

// Content lives in lib/testimonials.js. While SAMPLE_TESTIMONIALS is true, the section says so on the page.
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead
          title="Kind words"
          subtitle={SAMPLE_TESTIMONIALS ? 'Sample feedback: placeholder text until real testimonials are added.' : undefined}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => {
            const country = findCountry(t.country)
            return (
              <figure key={t.name} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
                <blockquote className="leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
                    aria-hidden
                  >
                    {initials(t.name)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-muted-foreground">
                      {country ? `${country.name} (${country.iso2})` : t.country}
                      {t.project ? ` · ${t.project}` : ''}
                    </span>
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
