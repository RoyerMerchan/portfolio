'use client'

import { getIcon } from '@/lib/icons'
import { socials } from '@/data/socials'

export default function Footer() {
  const ArrowUpIcon = getIcon('ArrowUp')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs">
              RM
            </div>
            <span className="font-semibold text-sm text-white">
              Royer<span className="text-gray-500 ml-1">Merchán</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = getIcon(social.iconName)
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/5"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="Volver al inicio"
          >
            <ArrowUpIcon className="w-4 h-4" />
            Volver al inicio
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Royer Merchán. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
