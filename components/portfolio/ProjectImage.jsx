'use client'

import { useEffect, useRef, useState } from 'react'

// Renders one project's image at a fixed 4:3 ratio (cropped with object-fit: cover, never stretched).
// If the file is missing or broken it shows a neutral placeholder and, in development only,
// logs which project needs an image and where to put it.
export default function ProjectImage({ title, image }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)

  // An <img> that failed before React hydrated never fires onError, so check it once on mount.
  useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) setFailed(true)
  }, [])

  useEffect(() => {
    if ((failed || !image?.src) && process.env.NODE_ENV !== 'production') {
      console.warn(`[Projects] "${title}" needs an image. Add a file in public/images/projects/ and set its src in lib/projects.js.`)
    }
  }, [failed, title, image])

  if (!image?.src || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-muted text-center" role="img" aria-label={`${title} (image coming soon)`}>
        <span className="font-display text-4xl text-muted-foreground/70">
          {title
            .split(/\s+/)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')}
        </span>
        <span className="text-xs text-muted-foreground">Preview coming soon</span>
      </div>
    )
  }

  return (
    <img
      ref={ref}
      src={image.src}
      alt={image.alt || title}
      width={1200}
      height={900}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={{ objectPosition: image.position || 'center' }}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
  )
}
