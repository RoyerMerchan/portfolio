import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', as = 'button', href, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]'

    const variants = {
      primary:
        'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/40 active:scale-[0.98]',
      secondary:
        'bg-[#06B6D4] text-white hover:bg-[#0891B2] shadow-lg shadow-[#06B6D4]/25 hover:shadow-[#06B6D4]/40 active:scale-[0.98]',
      ghost:
        'text-gray-300 hover:text-white hover:bg-white/5 active:scale-[0.98]',
      outline:
        'border border-white/20 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 active:scale-[0.98]',
    }

    // min-h keeps every size at or above the 44px touch target.
    const sizes = {
      sm: 'px-3 py-1.5 text-xs min-h-9',
      md: 'px-5 py-2.5 text-sm min-h-11',
      lg: 'px-7 py-3 text-base min-h-12',
    }

    // An href always means a link, whether or not `as` was passed.
    if (as === 'a' || href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
