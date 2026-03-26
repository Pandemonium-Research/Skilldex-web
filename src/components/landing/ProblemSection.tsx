const items = [
  {
    label: 'No central home',
    body: 'Skills live scattered across projects. A debugging skill you wrote six months ago might as well not exist once you move repos.',
  },
  {
    label: 'No install command',
    body: 'Sharing a skill means attaching a file to a Slack message or checking in markdown nobody will find. There is no version, no distribution.',
  },
  {
    label: 'No quality signal',
    body: 'A skill on GitHub tells you nothing about whether it follows the spec, which Claude version it targets, or whether anyone maintains it.',
  },
]

export function ProblemSection() {
  return (
    <section className="py-16 border-t border-surface-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-8">
          The problem
        </p>
        <div className="divide-y divide-surface-border">
          {items.map((item) => (
            <div key={item.label} className="py-5 sm:grid sm:grid-cols-[200px_1fr] sm:gap-8 sm:items-baseline">
              <p className="text-sm font-medium text-text-primary mb-2 sm:mb-0">
                {item.label}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
