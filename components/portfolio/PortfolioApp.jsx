'use client'

import { MotionConfig } from 'framer-motion'

import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Skills from './Skills'
import Experience from './Experience'
import Education from './Education'
import Achievements from './Achievements'
import Testimonials from './Testimonials'
import Contact from './Contact'
import Footer from './Footer'

export default function PortfolioApp() {
  return (
    // reducedMotion="user": framer-motion skips transform animations when the OS asks for reduced motion
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen overflow-x-clip">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Achievements />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </MotionConfig>
  )
}
