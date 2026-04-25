import Link from 'next/link'
import { CommandPaletteMock } from './CommandPaletteMock'

export function Hero() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-16 items-center">

          {/* Left — text */}
          <div>
            {/* Amber version badge */}
            <div className="inline-flex items-center gap-2.5 mb-7 px-3 py-1.5 rounded-full border border-brand/20 bg-brand/[0.06] text-brand text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_6px_#ff8a1f] flex-none" aria-hidden="true" />
              Skilldex v1.0 is here
            </div>

            <h1 className="text-5xl sm:text-[68px] font-semibold text-text-primary leading-[1.04] tracking-[-0.035em] mb-6">
              Every agent<br />skill, one search<br />away.
            </h1>

            <p className="text-[18px] text-text-secondary max-w-[460px] mb-9 leading-[1.55]">
              Skilldex is a fast, beautiful registry for agent skills. Search, install, and version your skills with a single command.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/install"
                className="inline-flex items-center px-5 py-3 bg-brand text-[#1a0e02] rounded-lg text-sm font-semibold shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_6px_24px_rgba(255,138,31,0.35)] hover:bg-brand-dim transition-colors"
              >
                Install Skilldex →
              </Link>
              <Link
                href="/registry"
                className="inline-flex items-center px-5 py-3 bg-surface-overlay text-text-primary border border-surface-border rounded-lg text-sm font-medium shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] hover:bg-surface-overlay/80 transition-colors"
              >
                Browse registry
              </Link>
            </div>

            <div className="flex items-center gap-6 text-xs text-text-muted font-mono mt-7">
              <span>Free · open source</span>
              <span className="text-surface-border" aria-hidden="true">·</span>
              <span>macOS · Linux · Windows</span>
            </div>
          </div>

          {/* Right — interactive command palette mock */}
          <div className="hidden lg:block">
            <CommandPaletteMock />
          </div>

        </div>
      </div>
    </section>
  )
}
