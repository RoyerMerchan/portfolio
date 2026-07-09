'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { stats } from '@/data/stats'
import { getIcon } from '@/lib/icons'

function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value, duration, prefersReducedMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="relative section-y">
      <div className="max-w-7xl mx-auto gutter">
        <SectionHeader
          title="En cifras"
          subtitle="Resultados tangibles de mi trabajo en sistemas empresariales"
        />

        {/* Six across only once there's room; at lg the labels wrapped to four lines. */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-5">
          {stats.map((stat, index) => {
            const Icon = getIcon(stat.iconName)
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="text-center p-4 sm:p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#7C3AED]/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-snug text-balance">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
