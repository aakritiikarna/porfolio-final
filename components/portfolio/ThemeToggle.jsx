'use client'

import { useCallback, useEffect, useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'

import { THEME_STORAGE_KEY } from '@/lib/theme'

// The single source of truth for the current theme is the "dark" class on <html>
// (set before first paint by the boot script in app/layout.jsx).
// useSyncExternalStore reads it, so there is no hydration mismatch: the server renders "light",
// and React updates to the real value right after hydrating, without a warning.
const subscribe = (notify) => {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}
const getSnapshot = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light')
const getServerSnapshot = () => 'light'

function applyTheme(theme, { animate = false } = {}) {
  const root = document.documentElement
  if (animate) {
    // Fade colors for a moment (see .theme-transition in globals.css), then go back to normal.
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 350)
  }
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

const readSaved = () => {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export default function ThemeToggle({ className = '' }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const isDark = theme === 'dark'

  // Follow the operating system while the visitor has not made a choice yet,
  // and stay in sync when another tab changes the saved theme.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystem = (e) => {
      if (!readSaved()) applyTheme(e.matches ? 'dark' : 'light', { animate: true })
    }
    const onStorage = (e) => {
      if (e.key === THEME_STORAGE_KEY) applyTheme(readSaved() ?? (media.matches ? 'dark' : 'light'))
    }
    media.addEventListener('change', onSystem)
    window.addEventListener('storage', onStorage)
    return () => {
      media.removeEventListener('change', onSystem)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggle = useCallback(() => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark'
    applyTheme(next, { animate: true })
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* storage unavailable: the theme still changes for this visit, it just will not persist */
    }
  }, [])

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 ${className}`}
    >
      {/* Both icons are always rendered and swapped with CSS (rotate + scale), so there is no flash on load. */}
      <Sun
        data-theme-icon
        aria-hidden="true"
        className="h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        data-theme-icon
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
      />
    </button>
  )
}
