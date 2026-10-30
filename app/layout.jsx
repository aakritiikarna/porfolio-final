import { Newsreader, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { THEME_BOOT_SCRIPT } from '@/lib/theme'

// Display: Newsreader (a text serif with optical sizing) for the name and headings.
// Body: Instrument Sans. Both are variable fonts, so no weight list is needed.
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata = {
  title: 'Aakriti Karna | Developer Portfolio',
  description:
    'Aakriti Karna builds useful digital solutions with React, Next.js, Node.js and Python. Projects include a train delay prediction API, an inventory system and an online code editor.',
  keywords:
    'Aakriti Karna, Portfolio, Developer, React, Next.js, Node.js, Express, Django, Python, JavaScript, Freelance Developer',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // Browser UI color (mobile address bar) follows the system scheme; matches --background in each theme.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F7F9' },
    { media: '(prefers-color-scheme: dark)', color: '#101219' },
  ],
}

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the boot script below adds the "dark" class to <html> before React loads,
    // so the server HTML and the client DOM legitimately differ on that one attribute.
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">{children}</body>
    </html>
  )
}
