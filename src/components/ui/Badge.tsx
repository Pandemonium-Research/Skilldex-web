import { clsx } from 'clsx'

type BadgeVariant = 'verified' | 'community' | 'default'

type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono',
        {
          'bg-brand/15 text-brand border border-brand/30': variant === 'verified',
          'bg-term-green/10 text-term-green border border-term-green/20': variant === 'community',
          'bg-surface-overlay text-text-secondary border border-surface-border': variant === 'default',
        }
      )}
    >
      {children}
    </span>
  )
}
