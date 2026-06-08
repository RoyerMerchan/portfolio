'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { socials } from '@/data/socials'
import { getIcon } from '@/lib/icons'

const contactInfo = [
  {
    label: 'Email',
    value: 'alejandromerchanserrano@gmail.com',
    href: 'mailto:alejandromerchanserrano@gmail.com',
    iconName: 'Mail',
  },
  {
    label: 'GitHub',
    value: 'github.com/RoyerMerchan',
    href: 'https://github.com/RoyerMerchan',
    iconName: 'Github',
  },
  {
    label: 'LinkedIn',
    value: 'Royer Merchan',
    href: 'https://www.linkedin.com/in/royer-merchan-29545579',
    iconName: 'Linkedin',
  },
  {
    label: 'WhatsApp',
    value: '+58 414 736 7490',
    href: 'https://wa.me/584147367490',
    iconName: 'MessageCircle',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Contacto"
          subtitle="Hablemos de tu próximo proyecto"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Trabajemos juntos
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Si tienes un proyecto en mente o necesitas un desarrollador
              fullstack para tu equipo, estoy abierto a nuevas oportunidades.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item) => {
                const Icon = getIcon(item.iconName)
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#7C3AED]/30 transition-all duration-300 group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7C3AED]/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm font-medium text-white truncate">
                        {item.value}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                as="a"
                href="/RoyerMerchan.pdf"
                size="lg"
              >
                <DownloadIcon />
                Descargar CV
              </Button>
              <Button
                variant="outline"
                size="lg"
                as="a"
                href="https://github.com/RoyerMerchan"
              >
                <GithubIcon />
                GitHub
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

function DownloadIcon() {
  const Icon = getIcon('Download')
  return <Icon className="w-4 h-4" />
}

function GithubIcon() {
  const Icon = getIcon('Github')
  return <Icon className="w-4 h-4" />
}
