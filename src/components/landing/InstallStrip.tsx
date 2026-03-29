import { TabSwitcher } from '@/components/ui/TabSwitcher'
import { CodeBlock } from '@/components/ui/CodeBlock'

const tabs = [
  {
    id: 'npm',
    label: 'npm',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">Requires Node.js 20+</p>
        <CodeBlock code="npm install -g skilldex-cli" language="bash" />
      </div>
    ),
  },
  {
    id: 'brew',
    label: 'Homebrew',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">macOS and Linux</p>
        <CodeBlock code={"brew tap pandemonium-research/skilldex\nbrew install skilldex-cli"} language="bash" />
      </div>
    ),
  },
  {
    id: 'curl',
    label: 'curl',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">macOS and Linux — requires Node.js 20+</p>
        <CodeBlock code="curl -fsSL https://skilldex-web.vercel.app/install.sh | sh" language="bash" />
      </div>
    ),
  },
  {
    id: 'scoop',
    label: 'Scoop',
    content: (
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-3">Windows — requires Node.js 20+</p>
        <CodeBlock code={"scoop bucket add skilldex https://github.com/Pandemonium-Research/scoop-skilldex\nscoop install skilldex-cli"} language="bash" />
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
