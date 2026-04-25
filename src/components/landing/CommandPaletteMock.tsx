'use client'

import { useState } from 'react'

const SKILLS = [
  { name: 'forensics-agent',  description: 'Deep-dive memory and heap analysis for running processes', score: 94 },
  { name: 'shadcn-builder',   description: 'Scaffold and theme shadcn/ui components from a prompt',   score: 91 },
  { name: 'sql-explainer',    description: 'Annotate and explain any SQL query with execution plans',  score: 88 },
  { name: 'rfc-author',       description: 'Draft RFC-style technical documents from bullet points',   score: 85 },
]

export function CommandPaletteMock() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="rounded-[14px] overflow-hidden bg-surface-raised border border-surface-border shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_32px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,138,31,0.08),0_0_80px_-10px_rgba(255,138,31,0.2)]">
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 py-[14px] border-b border-surface-border">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary flex-none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          readOnly
          value="forensics"
          className="flex-1 bg-transparent border-none outline-none text-text-primary text-[15px] font-sans caret-brand"
          aria-label="Search registry"
        />
        <kbd className="text-[10px] font-mono text-text-muted bg-surface-overlay border border-surface-border rounded px-1.5 py-0.5">
          esc
        </kbd>
      </div>

      {/* Results list */}
      <div className="px-2 pt-2 pb-3">
        <p className="px-3 py-1.5 text-[11px] font-mono text-text-muted uppercase tracking-[0.08em]">
          Skills · 12 results
        </p>
        {SKILLS.map((skill, i) => (
          <div
            key={skill.name}
            onMouseEnter={() => setSelected(i)}
            className={`flex items-center gap-3 px-3 py-[10px] rounded-lg cursor-pointer transition-all border ${
              selected === i
                ? 'bg-brand/[0.10] border-brand/20'
                : 'bg-transparent border-transparent'
            }`}
          >
            {/* Icon badge */}
            <div className={`w-7 h-7 rounded-[6px] flex-none flex items-center justify-center font-mono text-[11px] font-bold transition-all ${
              selected === i
                ? 'bg-gradient-to-br from-brand to-brand-dim text-[#1a0e02] shadow-[0_0_12px_rgba(255,138,31,0.4)]'
                : 'bg-surface-overlay text-text-secondary'
            }`}>
              {skill.name[0].toUpperCase()}
            </div>

            {/* Name + description */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary mb-0.5">{skill.name}</div>
              <div className="text-xs text-text-secondary truncate">{skill.description}</div>
            </div>

            {/* Score */}
            <div className="text-[11px] font-mono text-text-muted flex-none">{skill.score}</div>

            {/* Install hint on selected row */}
            {selected === i && (
              <span className="text-[11px] font-mono text-brand bg-brand/[0.12] px-1.5 py-0.5 rounded flex-none">
                ↵ install
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer hints */}
      <div className="flex items-center justify-between px-4 py-[10px] border-t border-surface-border text-[11px] font-mono text-text-muted">
        <span>↑↓ navigate · ↵ install · ⌘ shortcuts</span>
        <span>3k+ skills indexed</span>
      </div>
    </div>
  )
}
