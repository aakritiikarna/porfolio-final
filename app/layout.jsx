import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
export const metadata = {
  title: 'Aakriti Karna — Developer | Portfolio',
  description:
    'Early-career developer with a B.Tech in Computer Science and Engineering. Projects in React, Next.js, Node.js and Python. Available for freelance work and open to development roles.',
  keywords:
    'Aakriti Karna, Portfolio, Developer, React, Next.js, Node.js, Express, Django, Python, Java, JavaScript, Freelance Developer',
}
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[#070617] text-white selection:bg-violet-500/40 selection:text-white font-sans">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
