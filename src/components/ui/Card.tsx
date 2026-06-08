import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', hover = true, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/5 border border-white/10',
      glass:
        'bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-xl',
      outline: 'border border-white/[0.12] bg-transparent',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl transition-all duration-300',
          variants[variant],
          hover && 'hover:bg-white/[0.1] hover:border-white/[0.2] hover:shadow-2xl hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
