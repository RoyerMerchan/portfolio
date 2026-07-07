'use client'

import { motion, type Variants } from 'framer-motion'
import { getIcon } from '@/lib/icons'
import Button from '@/components/ui/Button'

const techBadges = [
  'React', 'TypeScript', 'Node.js', 'Docker',
  'MariaDB', 'Go', 'Python', 'MongoDB',
  'Socket.IO', 'Express', 'Traefik', 'Nginx',
]

export default function Hero() {
  const DownloadIcon = getIcon('Download')
  const ArrowRightIcon = getIcon('ArrowRight')
  const SparklesIcon = getIcon('Sparkles')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background: pixel-art dev illustration + legibility scrim */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/hero-merchan.jpg"
          alt="Royer Merchán programando entre monitores con código"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Left→right scrim keeps the headline legible over the art */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-[var(--color-bg)]/25" />
        {/* Top + bottom fades blend into the navbar and the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/50 via-transparent to-[var(--color-bg)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              Disponible para proyectos
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Royer{' '}
            <span className="text-[var(--color-primary)]">
              Merchan
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300"
          >
            Desarrollador Fullstack
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed"
          >
            Desarrollador fullstack orientado a sistemas empresariales, APIs,
            automatización, bases de datos e infraestructura moderna.
            Construyo soluciones reales para empresas.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Button size="lg" onClick={() => scrollTo('projects')}>
              Ver proyectos
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollTo('contact')}>
              Contactarme
            </Button>
            <Button variant="ghost" size="lg" href="/RoyerMerchan.pdf">
              <DownloadIcon className="w-4 h-4" />
              Descargar CV
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mt-10"
          >
            {techBadges.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.06] border border-white/[0.1] text-gray-400 hover:text-white hover:bg-white/[0.1] hover:border-[#7C3AED]/30 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"
          />
        </div>
      </motion.div>
    </section>
  )
}
