const items = [
  {
    icon: '▣',
    label: 'No central home',
    body: 'Skills live scattered across projects. A debugging skill you wrote six months ago might as well not exist once you move repos.',
  },
  {
    icon: '↗',
    label: 'No install command',
    body: 'Sharing a skill means attaching a file to a Slack message or checking in markdown nobody will find. There is no version, no distribution.',
  },
  {
    icon: '✓',
    label: 'No quality signal',
    body: 'A skill on GitHub tells you nothing about whether it follows the spec, which Claude version it targets, or whether anyone maintains it.',
  },
]

export function ProblemSection() {
  return (
    <section className="py-16 border-t border-surface-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-mono text-brand uppercase tracking-[0.14em] mb-4 font-semibold">
          The problem
        </p>
        <h2 className="text-3xl sm:text-[44px] font-semibold leading-[1.05] mb-12 max-w-2xl">
          Skills shouldn&apos;t live in a folder<br className="hidden sm:block" /> nobody can find.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="bg-surface-raised border border-surface-border rounded-xl p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]"
            >
              <div className="w-9 h-9 rounded-lg mb-5 flex items-center justify-center font-mono font-bold text-brand text-base bg-gradient-to-br from-brand/[0.18] to-brand/[0.04] border border-brand/20">
                {item.icon}
              </div>
              <div className="text-base font-semibold mb-2">{item.label}</div>
              <div className="text-sm text-text-secondary leading-relaxed">{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
