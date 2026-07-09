'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({ title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-10 sm:mb-14 lg:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white mb-4 tracking-[-0.01em] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto text-pretty">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-5 sm:mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]',
          align === 'center' && 'mx-auto'
        )}
      />
    </motion.div>
  )
}
