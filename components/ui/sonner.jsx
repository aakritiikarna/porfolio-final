'use client'
import { Toaster as Sonner } from 'sonner'
const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#13102b] group-[.toaster]:text-zinc-100 group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-zinc-400',
          actionButton: 'group-[.toast]:bg-fuchsia-500 group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-white/10 group-[.toast]:text-zinc-300',
        },
      }}
      {...props}
    />
  )
}
export { Toaster }
