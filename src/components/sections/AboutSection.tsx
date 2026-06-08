'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { getIcon } from '@/lib/icons'

const highlights = [
  { icon: 'Code2', text: 'Desarrollo fullstack con React, Node.js y TypeScript' },
  { icon: 'Server', text: 'APIs RESTful escalables con Express y Go' },
  { icon: 'Database', text: 'Bases de datos: MariaDB, MySQL, SQL Server, MongoDB, Redis' },
  { icon: 'Container', text: 'Infraestructura Docker con Traefik y Coolify' },
  { icon: 'Workflow', text: 'Automatización de procesos con n8n' },
  { icon: 'Activity', text: 'Monitoreo proactivo con Checkmk y Uptime Kuma' },
]

export default function AboutSection() {
  const QuoteIcon = getIcon('Quote')

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Sobre mí"
          subtitle="Ingeniero de sistemas apasionado por construir soluciones empresariales robustas"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] blur-2xl opacity-30" />
              <img
                src="/imageme.jpg"
                alt="Royer merchan"
                className="relative w-full h-full object-cover rounded-2xl border-2 border-white/[0.12] shadow-2xl"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 hidden sm:flex items-center justify-center backdrop-blur-xl">
              <QuoteIcon className="w-8 h-8 text-[#7C3AED]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              Soy ingeniero de sistemas con experiencia en el desarrollo de
              sistemas empresariales, APIs, dashboards administrativos y
              automatización de procesos. Me especializo en construir
              soluciones reales que resuelven problemas concretos de negocio.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Mi enfoque combina frontend moderno con React y TypeScript,
              backend robusto con Node.js y Go, y una sólida base en
              infraestructura con Docker, Traefik y monitoreo proactivo.
              Cada proyecto que entrego está diseñado para ser escalable,
              mantenible y confiable en entornos de producción.
            </p>

            <div className="space-y-3">
              {highlights.map((item) => {
                const Icon = getIcon(item.icon)
                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 text-[#7C3AED]" />
                    </div>
                    <span className="text-sm text-gray-400">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
