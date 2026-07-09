'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { experiences } from '@/data/experience'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative section-y">
      <div className="max-w-4xl mx-auto gutter">
        <SectionHeader
          title="Trayectoria"
          subtitle="Mi evolución profesional en el desarrollo de software empresarial"
        />

        <div className="relative">
          {/* Rail: hugs the left edge on mobile, centred once there's room for two columns */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#7C3AED] via-[#06B6D4] to-transparent md:-translate-x-px" />

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
                className={cn(
                  'relative flex items-start mb-10 sm:mb-12 md:gap-8',
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                <div className="absolute left-5 md:left-1/2 w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 rounded-full bg-[var(--color-bg)] border-2 border-[#7C3AED]/50 flex items-center justify-center z-10 shadow-lg shadow-[#7C3AED]/20">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#7C3AED]" />
                </div>

                {/* flex-1 (not w-full) so the mobile left margin can't push the card off-screen */}
                <div
                  className={cn(
                    'flex-1 min-w-0 ml-16 md:ml-0 md:flex-none md:w-[calc(50%-2rem)]',
                    isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'
                  )}
                >
                  <div className="p-5 sm:p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#7C3AED]/20 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-medium mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 text-balance">
                      {exp.area}
                    </h3>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className={cn(
                            // Right-aligned cards need the bullet on the right too,
                            // otherwise the marker floats away from its ragged text.
                            'flex items-start gap-2 text-sm text-gray-400 text-pretty',
                            isLeft && 'md:flex-row-reverse'
                          )}
                        >
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
