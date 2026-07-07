'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { experiences } from '@/data/experience'
import { getIcon } from '@/lib/icons'

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Trayectoria"
          subtitle="Mi evolución profesional en el desarrollo de software empresarial"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#7C3AED] via-[#06B6D4] to-transparent md:-translate-x-px" />

          {experiences.map((exp, index) => {
            const Icon = getIcon(exp.iconName)
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={exp.area}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-[var(--color-bg)] border-2 border-[#7C3AED]/50 flex items-center justify-center z-10 shadow-lg shadow-[#7C3AED]/20">
                  <Icon className="w-5 h-5 text-[#7C3AED]" />
                </div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'
                  }`}
                >
                  <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#7C3AED]/20 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-medium mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {exp.area}
                    </h3>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C3AED] flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
