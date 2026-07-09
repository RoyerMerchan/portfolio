'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getIcon } from '@/lib/icons'
import { navLinks } from '@/data/socials'

// The "Contáctame!" CTA already covers #contact on desktop; listing it twice
// is what pushed the bar past its container between 768px and 1024px.
const desktopLinks = navLinks.filter((link) => link.href !== '#contact')

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the sheet; widening past the lg breakpoint dismisses it so it
  // can't linger invisibly once the desktop nav takes over.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const mq = window.matchMedia('(min-width: 64rem)')
    const onChange = () => mq.matches && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [isOpen])

  const scrollTo = (id: string) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled || isOpen
          ? 'bg-[var(--color-bg)]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gutter py-3 sm:py-4">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 group shrink-0"
          aria-label="Ir al inicio"
        >
          <img
            src="/logo-rm.png"
            alt=""
            className="h-8 sm:h-9 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
          />
          <span className="font-semibold text-sm sm:text-base text-white hidden sm:block">
            ROYER<span className="text-gray-400 ml-1">MERCHAN</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Secciones">
          {desktopLinks.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </button>
            )
          })}
          <button
            onClick={() => scrollTo('contact')}
            className="ml-4 px-5 py-2 min-h-11 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-lg shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/40"
          >
            Contáctame!
          </button>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2.5 -mr-2.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            {/* Capped so a landscape phone can still reach the last link. */}
            <nav
              aria-label="Secciones"
              className="gutter flex flex-col gap-1 max-h-[calc(100svh-4.5rem)] overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {navLinks.map((link) => {
                const Icon = getIcon('ChevronRight')
                const id = link.href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 min-h-12 rounded-lg text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                    <Icon className="w-4 h-4 opacity-50" />
                  </button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function MenuIcon() {
  const Icon = getIcon('Menu')
  return <Icon className="w-6 h-6" />
}

function XIcon() {
  const Icon = getIcon('X')
  return <Icon className="w-6 h-6" />
}
