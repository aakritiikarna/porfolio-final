'use client'

import { MotionConfig } from 'framer-motion'

import AnimatedBackdrop from './AnimatedBackdrop'
import Spotlight from './Spotlight'
import ProgressBar from './ProgressBar'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Projects from './Projects'
import Education from './Education'
import Achievements from './Achievements'
import Contact from './Contact'
import Footer from './Footer'

export default function PortfolioApp() {
  return (
    // reducedMotion="user": framer-motion skips transform/layout animations when the OS asks for reduced motion
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-x-clip">
        <AnimatedBackdrop />
        <Spotlight />
        <ProgressBar />
        <div className="relative z-20">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Achievements />
          <Contact />
          <Footer />
        </div>
      </main>
    </MotionConfig>
  )
}
