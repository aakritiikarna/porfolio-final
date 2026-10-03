'use client'

import { useIsMobile } from '@/lib/useIsMobile'

export const EASE = [0.22, 1, 0.36, 1]

// Shared reveal variants. Parent: initial="hidden" whileInView="show" variants={container}.
// Children: variants={item}. Reduced-motion is handled globally by <MotionConfig reducedMotion="user">.
export function useMotion() {
  const mobile = useIsMobile()
  const y = mobile ? 12 : 24
  const duration = mobile ? 0.4 : 0.6
  return {
    mobile,
    viewport: { once: true, margin: '0px 0px -60px 0px' },
    container: { hidden: {}, show: { transition: { staggerChildren: mobile ? 0.05 : 0.09 } } },
    item: { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration, ease: EASE } } },
  }
}
