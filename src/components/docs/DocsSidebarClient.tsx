'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import type { NavSection } from '@/types/docs'

export function DocsSidebarClient({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-5">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5 px-2">
            {section.title}
          </p>
          <ul className="space-y-px">
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block px-2 py-1 rounded text-xs transition-colors',
                      isActive
                        ? 'text-text-primary bg-surface-overlay'
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
