'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { skillGroups } from '@/data/skills'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

const groupColors: Record<string, string> = {
  Frontend: 'from-[#7C3AED] to-[#8B5CF6]',
  Backend: 'from-[#06B6D4] to-[#0891B2]',
  Databases: 'from-[#22C55E] to-[#16A34A]',
  'DevOps & Infrastructure': 'from-[#F97316] to-[#EA580C]',
  Mobile: 'from-[#06B6D4] to-[#7C3AED]',
  'Automation & Tools': 'from-[#7C3AED] to-[#22C55E]',
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Stack Tecnológico"
          subtitle="Tecnologías y herramientas con las que construyo soluciones empresariales"
        />

        <div className="space-y-16">
          {skillGroups.map((group, groupIndex) => {
            const GroupIcon = getIcon(group.iconName)
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br',
                      groupColors[group.title] || 'from-[#7C3AED] to-[#8B5CF6]'
                    )}
                  >
                    <GroupIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {group.title}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/[0.1] to-transparent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {group.skills.map((skill, skillIndex) => {
                    const SkillIcon = getIcon(skill.iconName)
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="group relative"
                      >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#7C3AED]/30 transition-all duration-300">
                          <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-[#7C3AED]/10 transition-colors duration-300">
                            <SkillIcon className="w-5 h-5 text-gray-400 group-hover:text-[#7C3AED] transition-colors duration-300" />
                          </div>
                          <span className="text-sm font-medium text-gray-400 group-hover:text-white text-center transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
