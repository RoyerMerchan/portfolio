import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ServicesSection from '@/components/sections/ServicesSection'
import StatsSection from '@/components/sections/StatsSection'
import ContactSection from '@/components/sections/ContactSection'

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ServicesSection />
      <StatsSection />
      <ContactSection />
    </>
  )
}

function RedirectToHome() {
  const location = useLocation()

  useEffect(() => {
    const section = location.pathname === '/proyects' ? 'projects'
      : location.pathname === '/skill' ? 'skills'
      : 'hero'
    const el = document.getElementById(section)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
    window.history.replaceState(null, '', '/')
  }, [location.pathname])

  return <HomePage />
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col min-h-svh">
        <Navbar />
        <main className="flex-1">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/proyects" element={<RedirectToHome />} />
            <Route path="/skill" element={<RedirectToHome />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
