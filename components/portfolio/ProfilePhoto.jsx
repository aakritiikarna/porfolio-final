import { SITE } from '@/lib/site'

// Replace public/images/profile.jpg to change the photo (same filename = no code change).
export default function ProfilePhoto() {
  return (
    <div className="mx-auto w-40 sm:w-48 md:ml-auto md:mr-0 md:w-60">
      <img
        src={SITE.photo}
        alt="Portrait of Aakriti Karna"
        width={560}
        height={700}
        decoding="async"
        className="block aspect-[4/5] w-full rounded-2xl border border-border object-cover"
      />
    </div>
  )
}
