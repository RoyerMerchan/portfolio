'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import TechBadge from '@/components/ui/TechBadge'
import { projects } from '@/data/projects'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

const statusColors: Record<string, string> = {
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  'in-progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  maintained: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const statusLabels: Record<string, string> = {
  completed: 'Completado',
  'in-progress': 'En progreso',
  maintained: 'En mantenimiento',
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Proyectos Destacados"
          subtitle="Soluciones reales que he construido para resolver problemas de negocio"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const ProjectIcon = getIcon(project.iconName)
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full flex flex-col overflow-hidden group">
                  {project.image && (
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                    </div>
                  )}

                  <div className={cn('p-6 flex flex-col flex-1', !project.image && 'pt-8')}>
                    {!project.image && (
                      <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center mb-4 group-hover:bg-[#7C3AED]/20 transition-colors duration-300">
                        <ProjectIcon className="w-6 h-6 text-[#7C3AED]" />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {project.type}
                      </span>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-medium border',
                          statusColors[project.status]
                        )}
                      >
                        {statusLabels[project.status]}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#7C3AED] transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {project.highlights.length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {project.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#7C3AED] flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techs.map((tech) => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </div>

                    {project.links && project.links.length > 0 && (
                      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                        {project.links.map((link) => {
                          const ExternalLinkIcon = getIcon('ExternalLink')
                          return (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
                            >
                              <ExternalLinkIcon className="w-3.5 h-3.5" />
                              {link.label}
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
