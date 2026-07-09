'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { services } from '@/data/services'
import { getIcon } from '@/lib/icons'

export default function ServicesSection() {
  return (
    <section id="services" className="relative section-y">
      <div className="max-w-7xl mx-auto gutter">
        <SectionHeader
          title="¿Qué puedo construir?"
          subtitle="Soluciones empresariales que transforman procesos y mejoran resultados"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, index) => {
            const Icon = getIcon(service.iconName)
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <div className="p-5 sm:p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#7C3AED]/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 border border-[#7C3AED]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:from-[#7C3AED]/30 group-hover:to-[#06B6D4]/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#7C3AED] group-hover:text-[#8B5CF6] transition-colors duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 text-balance">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed text-pretty">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
