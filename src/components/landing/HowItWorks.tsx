import { CodeBlock } from '@/components/ui/CodeBlock'

const steps = [
  {
    step: '1',
    title: 'Install the CLI',
    body: 'One command — npm, Homebrew, curl, or winget.',
    code: 'npm install -g skillpm',
  },
  {
    step: '2',
    title: 'Find a skill',
    body: 'Search the registry by name, tag, or description.',
    code: 'skillpm search forensics',
  },
  {
    step: '3',
    title: 'Install and use',
    body: 'Installed globally or into your project. Claude Code picks it up immediately.',
    code: 'skillpm install forensics',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 border-t border-surface-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-8">
          How it works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="flex flex-col gap-3 min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="flex-none w-5 h-5 rounded-full border border-surface-border flex items-center justify-center text-[10px] font-mono text-text-muted">
                  {step.step}
                </span>
                <h3 className="text-sm font-medium text-text-primary">{step.title}</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{step.body}</p>
              <div className="min-w-0">
                <CodeBlock code={step.code} language="bash" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
