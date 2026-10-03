'use client'

import { motion } from 'framer-motion'
import { EASE, useMotion } from '@/lib/motion'

// Fade + rise when scrolled into view (once). Optional `delay` in seconds.
// Vertical-only movement, so it never causes horizontal scrolling.
export function Reveal({ children, className, delay = 0 }) {
  const { mobile, viewport } = useMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: mobile ? 12 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: mobile ? 0.4 : 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Parent that staggers its <motion.div variants={item}> children when scrolled into view.
export function Stagger({ children, className }) {
  const { container, viewport } = useMotion()
  return (
    <motion.div className={className} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </motion.div>
  )
}

export default Reveal
