import { DocsSidebar } from '@/components/docs/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
        {/* Mobile sidebar */}
        <aside className="lg:hidden mb-8">
          <details className="border border-surface-border rounded-md overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-2.5 cursor-pointer bg-surface-raised text-sm font-mono text-text-secondary select-none">
              Navigation
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-4 py-4 bg-surface-base border-t border-surface-border">
              <DocsSidebar />
            </div>
          </details>
        </aside>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto pb-8 pr-4 border-r border-surface-border">
          <DocsSidebar />
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
