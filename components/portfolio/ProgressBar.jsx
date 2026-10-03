'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ProgressBar() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  // Reduced motion: follow the scroll position exactly, with no spring easing.
  const scaleX = reduced ? scrollYProgress : spring
  return <motion.div style={{ scaleX }} className="fixed top-0 inset-x-0 h-[3px] origin-left z-50 bg-violet-600" />
}
