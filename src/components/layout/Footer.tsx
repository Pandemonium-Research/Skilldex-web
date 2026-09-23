import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-surface-border mt-20 relative z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 mr-2">
              <div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-brand to-brand-dim flex items-center justify-center text-[11px] font-bold text-[#1a0e02] shadow-[0_0_8px_rgba(255,138,31,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] flex-none">
                S
              </div>
              <span className="text-[13px] font-semibold text-text-primary">Skilldex</span>
            </div>
            <Link href="/docs/getting-started" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Docs
            </Link>
            <Link href="/install" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Install
            </Link>
            <a
              href="https://github.com/Pandemonium-Research/Skilldex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Typed by hand: the site does not depend on @skilldex/validator. Update when SPEC_VERSION
              or SKILLSET_SPEC_VERSION changes there. */}
          <p className="text-xs font-mono text-text-muted">
            MIT · skill spec v1.0 · skillset spec v1.1 · 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
