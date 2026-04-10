import Link from 'next/link'
import { CopyButton } from '@/components/ui/CopyButton'
import type { RegistrySkill } from '@/types/registry'

export function SkillCard({ skill }: { skill: RegistrySkill }) {
  const isVerified = skill.trust_tier === 'verified'
  return (
    <div className="flex items-center gap-6 px-5 py-3.5 hover:bg-surface-overlay transition-colors group">
      {/* Name + badge */}
      <div className="flex items-center gap-2.5 w-60 flex-none min-w-0">
        <Link
          href={`/registry/${skill.name}`}
          className="text-sm font-mono font-medium text-text-primary hover:text-brand transition-colors truncate"
        >
          {skill.name}
        </Link>
        {isVerified && (
          <span className="inline-flex items-center text-xs font-mono px-1.5 py-0.5 rounded border border-brand/25 text-brand/80 flex-none">
            verified
          </span>
        )}
      </div>

      {/* Description — takes all remaining space */}
      <p className="text-sm text-text-secondary leading-relaxed flex-1 min-w-0 line-clamp-1">
        {skill.description}
      </p>

      {/* Score */}
      {skill.score !== null && (
        <span className="text-xs font-mono text-text-secondary flex-none">
          {skill.score}
        </span>
      )}

      {/* Install command */}
      <div className="flex items-center gap-2 bg-surface-overlay border border-surface-border rounded px-3 py-1.5 flex-none">
        <code className="text-xs font-mono text-text-primary whitespace-nowrap">
          skillpm install {skill.name}
        </code>
        <CopyButton text={`skillpm install ${skill.name}`} />
      </div>
    </div>
  )
}
