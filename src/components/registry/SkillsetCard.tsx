import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CopyButton } from '@/components/ui/CopyButton'
import type { RegistrySkillset } from '@/types/registry'

function ScoreLabel({ score }: { score: number | null }) {
  if (score === null) return <span className="text-xs font-mono text-text-muted">—</span>
  const color = score >= 80 ? 'text-term-green' : score >= 50 ? 'text-term-yellow' : 'text-term-red'
  return (
    <span className="text-xs font-mono text-text-muted">
      <span className={color}>{score}</span>/100
    </span>
  )
}

export function SkillsetCard({ skillset }: { skillset: RegistrySkillset }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4 bg-surface-raised hover:bg-surface-overlay transition-colors">
      <div className="flex items-center gap-3 sm:w-56 flex-none">
        <Link
          href={`/registry/skillsets/${skillset.name}`}
          className="text-sm font-mono font-medium text-text-primary hover:text-term-green transition-colors"
        >
          {skillset.name}
        </Link>
        <Badge variant={skillset.trust_tier === 'verified' ? 'verified' : 'community'}>
          {skillset.trust_tier === 'verified' ? 'Verified' : 'Community'}
        </Badge>
        <span className="text-xs font-mono text-text-muted border border-surface-border rounded px-1.5 py-0.5">
          {skillset.skill_count} skills
        </span>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed flex-1 min-w-0 line-clamp-2">
        {skillset.description}
      </p>

      <div className="flex items-center gap-4 flex-none">
        <ScoreLabel score={skillset.score} />
        <div className="flex items-center gap-1 bg-surface-base rounded border border-surface-border px-2.5 py-1.5">
          <code className="text-xs font-mono text-text-muted whitespace-nowrap">
            skillpm skillset install {skillset.name}
          </code>
          <CopyButton text={`skillpm skillset install ${skillset.name}`} />
        </div>
      </div>
    </div>
  )
}
