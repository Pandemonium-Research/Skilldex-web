import Link from 'next/link'
import { CopyButton } from '@/components/ui/CopyButton'
import { searchSkills } from '@/lib/registry'
import type { RegistrySkill } from '@/types/registry'

function SkillRow({ skill }: { skill: RegistrySkill }) {
  const isVerified = skill.trust_tier === 'verified'
  return (
    <div className="flex items-center gap-6 px-5 py-3.5 hover:bg-surface-overlay transition-colors">
      <div className="flex items-center gap-2.5 w-60 flex-none min-w-0">
        <code className="text-sm font-mono font-medium text-text-primary truncate">
          {skill.name}
        </code>
        {isVerified && (
          <span className="inline-flex items-center text-xs font-mono px-1.5 py-0.5 rounded border border-brand/25 text-brand/80 flex-none">
            verified
          </span>
        )}
      </div>
      <p className="text-sm text-text-secondary flex-1 min-w-0 line-clamp-1">
        {skill.description}
      </p>
      {skill.score !== null && (
        <span className="text-xs font-mono text-text-secondary flex-none">{skill.score}</span>
      )}
      <div className="flex items-center gap-2 bg-surface-overlay border border-surface-border rounded px-3 py-1.5 flex-none">
        <code className="text-xs font-mono text-text-primary whitespace-nowrap">
          skillpm install {skill.name}
        </code>
        <CopyButton text={`skillpm install ${skill.name}`} />
      </div>
    </div>
  )
}

export async function RegistryPreview() {
  const { skills } = await searchSkills({ sort: 'installs', limit: 3 })
  if (skills.length === 0) return null

  return (
    <section className="py-16 border-t border-surface-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Registry</p>
            <p className="text-sm text-text-secondary">Popular skills from the community</p>
          </div>
          <Link href="/registry" className="text-xs font-mono text-text-secondary hover:text-text-primary transition-colors">
            Browse all →
          </Link>
        </div>
        <div className="divide-y divide-surface-border border border-surface-border rounded-lg overflow-hidden">
          {skills.map((skill) => <SkillRow key={skill.name} skill={skill} />)}
        </div>
      </div>
    </section>
  )
}
