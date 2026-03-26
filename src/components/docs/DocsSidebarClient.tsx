'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import type { NavSection } from '@/types/docs'

export function DocsSidebarClient({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-6 pt-2">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-muted mb-2 px-3">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block px-3 py-1.5 rounded-md text-[13px] transition-colors',
                      isActive
                        ? 'text-brand font-medium bg-brand/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
