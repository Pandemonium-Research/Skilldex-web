import Link from 'next/link'
import { CodeBlock } from '@/components/ui/CodeBlock'

export function Hero() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-sm text-text-muted mb-6 tracking-wide">
          skilldex / v1.0
        </p>

        <h1 className="text-4xl sm:text-5xl font-semibold text-text-primary leading-[1.15] tracking-tight mb-5">
          A package manager<br className="hidden sm:block" /> for Claude Code skills.
        </h1>

        <p className="text-lg text-text-secondary max-w-xl mb-10 leading-relaxed">
          Install, share, and discover skills from a central registry.
          One command. Any project.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          <div className="w-full sm:w-80">
            <CodeBlock code="npm install -g skillpm" language="bash" />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/docs/getting-started"
              className="text-sm font-medium text-text-primary hover:text-brand transition-colors underline underline-offset-4 decoration-surface-border hover:decoration-brand"
            >
              Get started →
            </Link>
            <Link
              href="/registry"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Browse registry
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-text-muted font-mono">
          <span>Open source</span>
          <span className="text-surface-border">·</span>
          <span>MIT license</span>
          <span className="text-surface-border">·</span>
          <span>Spec v1.0</span>
        </div>
      </div>
    </section>
  )
}
