import { TabSwitcher } from '@/components/ui/TabSwitcher'
import { CodeBlock } from '@/components/ui/CodeBlock'

const tabs = [
  {
    id: 'npm',
    label: 'npm',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">Requires Node.js 18+</p>
        <CodeBlock code="npm install -g skillpm" language="bash" />
      </div>
    ),
  },
  {
    id: 'brew',
    label: 'Homebrew',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">macOS and Linux</p>
        <CodeBlock code="brew install skilldex" language="bash" />
      </div>
    ),
  },
  {
    id: 'curl',
    label: 'curl',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">macOS and Linux — detects OS and architecture automatically</p>
        <CodeBlock code="curl -fsSL https://skilldex.dev/install.sh | sh" language="bash" />
      </div>
    ),
  },
  {
    id: 'winget',
    label: 'winget',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">Windows 10/11</p>
        <CodeBlock code="winget install skilldex" language="bash" />
      </div>
    ),
  },
  {
    id: 'scoop',
    label: 'Scoop',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">Windows via Scoop</p>
        <CodeBlock code="scoop install skilldex" language="bash" />
      </div>
    ),
  },
]

export function InstallStrip() {
  return (
    <section className="py-16 border-t border-surface-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">
          Install
        </p>
        <TabSwitcher tabs={tabs} defaultTab="npm" />
      </div>
    </section>
  )
}
