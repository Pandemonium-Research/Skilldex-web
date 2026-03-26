import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-surface-border mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/docs/getting-started" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Docs
            </Link>
            <Link href="/install" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Install
            </Link>
            <a
              href="https://github.com/anthropics/skilldex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/anthropics/skilldex/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Discussions
            </a>
          </div>

          <p className="text-xs font-mono text-text-muted">
            skilldex · MIT · spec v1.0
          </p>
        </div>
      </div>
    </footer>
  )
}
