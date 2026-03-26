import Link from 'next/link'
import { getAllDocs } from '@/lib/docs'

export function DocsPager({ currentSlug }: { currentSlug: string[] }) {
  const allDocs = getAllDocs().sort((a, b) => {
    // Sort by section order then item order
    if (a.section !== b.section) {
      return (a.order ?? 99) - (b.order ?? 99)
    }
    return (a.order ?? 99) - (b.order ?? 99)
  })

  const currentHref = '/docs/' + currentSlug.join('/')
  const currentIndex = allDocs.findIndex((d) => d.href === currentHref)

  const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null
  const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <nav
      className="flex items-start justify-between mt-12 pt-6 border-t border-surface-border"
      aria-label="Pagination"
    >
      <div>
        {prev && (
          <Link
            href={prev.href}
            className="group flex flex-col gap-1 text-left"
          >
            <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">
              ← Previous
            </span>
            <span className="text-sm font-medium text-text-secondary group-hover:text-brand transition-colors">
              {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={next.href}
            className="group flex flex-col gap-1 text-right"
          >
            <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">
              Next →
            </span>
            <span className="text-sm font-medium text-text-secondary group-hover:text-brand transition-colors">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
