const lines = [
  { type: 'prompt',  text: '$ skillpm install forensics-agent' },
  { type: 'dim',     text: '  Resolving forensics-agent@latest...' },
  { type: 'dim',     text: '  Fetching from registry (412ms)' },
  { type: 'success', text: '  ✓ forensics-agent@1.2.0 · score 94 · verified' },
  { type: 'success', text: '  ✓ Done · 1 skill · 3 resources' },
  { type: 'blank',   text: '' },
  { type: 'prompt',  text: '$ skillpm list' },
  { type: 'out',     text: '  global (1)' },
  { type: 'out',     text: '    forensics-agent  1.2.0' },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '# Your agent now has /forensics-analyze' },
]

function TerminalLine({ type, text }: { type: string; text: string }) {
  if (type === 'prompt' && text.startsWith('$ ')) {
    const rest = text.slice(2)
    const spaceIdx = rest.indexOf(' ')
    const cmd = spaceIdx === -1 ? rest : rest.slice(0, spaceIdx)
    const args = spaceIdx === -1 ? '' : rest.slice(spaceIdx)
    return (
      <div>
        <span className="text-text-muted">$ </span>
        <span className="text-brand">{cmd}</span>
        {args && <span className="text-text-primary">{args}</span>}
      </div>
    )
  }

  const cx: Record<string, string> = {
    dim:     'text-text-muted',
    success: 'text-term-green',
    out:     'text-text-secondary',
    blank:   '',
    comment: 'text-text-muted',
  }
  return <div className={cx[type] ?? ''}>{text || ' '}</div>
}

export function TerminalDemo() {
  return (
    <section className="py-16 border-t border-surface-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-mono text-brand uppercase tracking-[0.14em] mb-4 font-semibold">
          Terminal
        </p>
        <h2 className="text-3xl sm:text-[44px] font-semibold leading-[1.05] mb-10">
          Three commands.{' '}
          <span className="text-text-secondary">Empty to shipping.</span>
        </h2>

        <div className="rounded-[14px] overflow-hidden border border-surface-border bg-surface-raised shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_32px_80px_-20px_rgba(0,0,0,0.6),0_0_60px_-20px_rgba(255,138,31,0.15)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-overlay border-b border-surface-border">
            <span className="w-[11px] h-[11px] rounded-full bg-[#ff6157]" aria-hidden="true" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" aria-hidden="true" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="ml-3 text-[11.5px] font-mono text-text-muted">~/projects/incident-bot — skillpm</span>
          </div>
          {/* Terminal body */}
          <div className="p-7 font-mono text-[13.5px] leading-[1.85] bg-surface-raised">
            {lines.map((line, i) => (
              <TerminalLine key={i} type={line.type} text={line.text} />
            ))}
            <div>
              <span className="text-text-muted">$ </span>
              <span
                className="inline-block w-2 h-[14px] bg-brand align-middle shadow-[0_0_8px_#ff8a1f]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
