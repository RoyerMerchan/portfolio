'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getIcon } from '@/lib/icons'
import { navLinks } from '@/data/socials'

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

  const scrollTo = (id: string) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 group"
          aria-label="Ir al inicio"
        >
          <img
            src="/logo-rm.png"
            alt="RM — Royer Merchán"
            className="h-9 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
          />
          <span className="font-semibold text-sm sm:text-base text-white hidden sm:block">
            ROYER<span className="text-gray-400 ml-1">MERCHAN</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href.replace('#', ''))}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                activeSection === link.href.replace('#', '')
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="ml-4 px-5 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/40"
          >
            Contacto
          </button>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-4 pb-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = getIcon('ChevronRight')
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href.replace('#', ''))}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      activeSection === link.href.replace('#', '')
                        ? 'text-white bg-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                    <Icon className="w-4 h-4 opacity-50" />
                  </button>
                )
              })}
            </div>
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
