'use client'

import { motion } from 'framer-motion'

import { SITE } from '@/lib/site'
import { EASE } from '@/lib/motion'

// Compact profile card: small framed photo + name. Replace public/images/profile.jpg to change the photo.
export default function ProfilePhoto() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      className="w-40 sm:w-48 md:w-56 mx-auto md:mx-0 md:ml-auto"
    >
      <div className="rounded-2xl glass p-1.5">
        <img
          src={SITE.photo}
          alt="Portrait of Aakriti Karna"
          width={560}
          height={700}
          decoding="async"
          className="block w-full aspect-[4/5] object-cover rounded-xl"
        />
      </div>
      <figcaption className="mt-3 text-center md:text-left">
        <div className="font-display font-semibold leading-tight">Aakriti Karna</div>
        <div className="mt-0.5 text-xs text-zinc-400">Early Career Developer</div>
      </figcaption>
    </motion.figure>
  )
}
