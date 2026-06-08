'use client'

import { motion } from 'framer-motion'
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
  const TerminalIcon = getIcon('Terminal')
  const SparklesIcon = getIcon('Sparkles')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-[#06B6D4]/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/5 blur-[150px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
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
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              Merchán
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

        {/* Terminal decorative */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[380px]"
        >
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-gray-500 font-mono">terminal</span>
            </div>
            <div className="p-5 font-mono text-xs leading-relaxed">
              <div className="text-gray-500">$ <span className="text-green-400">~/portfolio</span> git status</div>
              <div className="text-gray-400 mt-1">On branch main</div>
              <div className="text-gray-400">Your branch is up to date</div>
              <div className="mt-3 text-gray-500">$ <span className="text-green-400">~/portfolio</span> npm run dev</div>
              <div className="text-[#7C3AED] mt-1">&gt; royer-merchan@1.0.0 dev</div>
              <div className="text-[#06B6D4]">&gt; Ready on port 3000</div>
              <div className="flex items-center gap-2 mt-3 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Sistema listo — 12 proyectos desplegados</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500">Scroll</span>
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
