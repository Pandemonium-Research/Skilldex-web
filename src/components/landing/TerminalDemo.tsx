// Mirrors what skillpm prints (install-action.ts, list-action.ts). anthropics/pdf is a real
// registry row: score 100, verified. The empty global and shared scope headers of `list` are
// left out for length.
const lines = [
  { type: 'prompt',  text: '$ skillpm install anthropics/pdf' },
  { type: 'success', text: '  ✔ Installed "pdf" at project scope' },
  { type: 'success', text: '  ✓ Score: 100/100 · Trust: verified' },
  { type: 'dim',     text: '  Linked into ~/projects/incident-bot/.agents/skills/pdf' },
  { type: 'dim',     text: '  Linked into ~/projects/incident-bot/.claude/skills/pdf' },
  { type: 'blank',   text: '' },
  { type: 'prompt',  text: '$ skillpm list' },
  { type: 'out',     text: '  project scope' },
  { type: 'out',     text: '    pdf                            score: 100/100  source: community' },
  { type: 'dim',     text: '  1 skill(s) installed across 3 scope(s)' },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '# Claude Code, Codex, Cursor and other agents now see it' },
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
          One install.{' '}
          <span className="text-text-secondary">Every agent.</span>
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
