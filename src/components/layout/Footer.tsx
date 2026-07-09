'use client'

import { getIcon } from '@/lib/icons'
import { socials } from '@/data/socials'

export default function Footer() {
  const ArrowUpIcon = getIcon('ArrowUp')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto gutter py-10 sm:py-12 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <img
              src="/logo-rm.png"
              alt=""
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-sm text-white">
              Royer<span className="text-gray-400 ml-1">Merchan</span>
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {socials.map((social) => {
              const Icon = getIcon(social.iconName)
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-white/5"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-2.5 -mx-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            <ArrowUpIcon className="w-4 h-4 shrink-0" />
            Volver al inicio
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-sm text-gray-400 text-pretty">
            &copy; {new Date().getFullYear()} Royer Merchan. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
