import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CopyButton } from '@/components/ui/CopyButton'
import type { SkillCard } from '@/types/registry'

const featuredSkills: SkillCard[] = [
  {
    name: 'forensics-agent',
    description: 'Deep code analysis and debugging. Traces execution paths, identifies root causes, and explains complex bugs with evidence.',
    tier: 'Verified',
    score: 94,
    specVersion: 'v1.0',
    installCommand: 'skillpm install forensics-agent',
    sourceUrl: 'https://github.com/anthropics/skilldex-skills',
    installCount: 4821,
  },
  {
    name: 'pr-reviewer',
    description: 'Automated pull request review with inline comments. Checks for logic errors, security issues, and style inconsistencies.',
    tier: 'Verified',
    score: 91,
    specVersion: 'v1.0',
    installCommand: 'skillpm install pr-reviewer',
    sourceUrl: 'https://github.com/anthropics/skilldex-skills',
    installCount: 3109,
  },
  {
    name: 'test-generator',
    description: 'Generates unit and integration tests from source files. Supports Jest, Vitest, pytest, and Go testing.',
    tier: 'Community',
    score: 87,
    specVersion: 'v1.0',
    installCommand: 'skillpm install test-generator',
    sourceUrl: 'https://github.com/community/test-generator-skill',
    installCount: 1872,
  },
]

export function RegistryPreview() {
  return (
    <section className="py-16 border-t border-surface-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
            Registry
          </p>
          <Link
            href="/registry"
            className="text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            Browse all →
          </Link>
        </div>

        <div className="divide-y divide-surface-border border border-surface-border rounded-lg overflow-hidden">
          {featuredSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4 bg-surface-raised hover:bg-surface-overlay transition-colors"
            >
              <div className="flex items-center gap-3 sm:w-48 flex-none">
                <code className="text-sm font-mono font-medium text-text-primary">
                  {skill.name}
                </code>
                <Badge variant={skill.tier === 'Verified' ? 'verified' : 'community'}>
                  {skill.tier}
                </Badge>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed flex-1 min-w-0">
                {skill.description}
              </p>

              <div className="flex items-center gap-4 flex-none">
                <span className="text-xs font-mono text-text-muted">
                  <span className="text-term-green">{skill.score}</span>/100
                </span>
                <div className="flex items-center gap-1 bg-surface-base rounded border border-surface-border px-2.5 py-1.5">
                  <code className="text-xs font-mono text-text-muted whitespace-nowrap">
                    skillpm install {skill.name}
                  </code>
                  <CopyButton text={skill.installCommand} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
