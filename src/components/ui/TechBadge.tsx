'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TechBadgeProps {
  name: string
  className?: string
}

export default function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        'bg-white/[0.08] border border-white/[0.12] text-gray-300',
        'hover:bg-white/[0.12] hover:border-[#7C3AED]/40 hover:text-white',
        'transition-all duration-200',
        className
      )}
    >
      {name}
    </motion.span>
  )
}
