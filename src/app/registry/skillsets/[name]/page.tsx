import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CopyButton } from '@/components/ui/CopyButton'
import { getSkillset } from '@/lib/registry'
import type { SkillsetCoherence } from '@/types/registry'

type Props = { params: { name: string } }

export async function generateMetadata({ params }: Props) {
  const skillset = await getSkillset(params.name)
  if (!skillset) return { title: 'Skillset not found — Skilldex' }
  return {
    title: `${skillset.name} — Skilldex Registry`,
    description: skillset.description,
  }
}

function barColor(pct: number) {
  return pct >= 80 ? 'bg-term-green' : pct >= 50 ? 'bg-term-yellow' : 'bg-term-red'
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-surface-base rounded-full h-1.5 overflow-hidden border border-surface-border">
        <div className={`h-full rounded-full ${barColor(score)}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono text-text-muted w-12 text-right">{score}/100</span>
    </div>
  )
}

/**
 * Coherence, shown as the fraction it is rather than as a second score out of 100.
 *
 * Deliberately not made to look interchangeable with the format score: they measure independent
 * things, and rendering "100/100" twice would invite reading them as one result confirmed twice.
 *
 * The convention count carries the meaning, so it is not optional detail. "4/4 members" against
 * declared conventions says every member restated them consistently. The same fraction with none
 * declared says only that no member contradicted another — a much weaker claim behind an
 * identical-looking number.
 */
function CoherenceBar({ coherence }: { coherence: SkillsetCoherence }) {
  const pct = coherence.pct ?? 0
  const declared = coherence.declared_conventions

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-surface-base rounded-full h-1.5 overflow-hidden border border-surface-border">
          <div className={`h-full rounded-full ${barColor(pct)}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-mono text-text-muted w-24 text-right">
          {coherence.members_coherent}/{coherence.members_checked} members
        </span>
      </div>
      <p className="text-xs font-mono text-text-muted mt-2">
        {declared > 0
          ? `Checked against ${declared} declared convention${declared === 1 ? '' : 's'}`
          : 'No shared conventions declared — members checked for contradictions only'}
      </p>
    </div>
  )
}

export default async function SkillsetPage({ params }: Props) {
  const skillset = await getSkillset(params.name)
  if (!skillset) notFound()

  const publishedDate = new Date(skillset.published_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/registry/skillsets"
          className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors mb-4 inline-block"
        >
          ← Registry
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-mono font-semibold text-text-primary">
            {skillset.name}
          </h1>
          <Badge variant={skillset.trust_tier === 'verified' ? 'verified' : 'community'}>
            {skillset.trust_tier === 'verified' ? 'Verified' : 'Community'}
          </Badge>
          <span className="text-xs font-mono text-text-muted border border-surface-border rounded px-2 py-0.5">
            skillset
          </span>
        </div>

        <p className="text-text-secondary leading-relaxed">{skillset.description}</p>
      </div>

      {/* Install */}
      <div className="border border-surface-border rounded-lg p-4 mb-6 bg-surface-raised">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Install</p>
        <div className="flex items-center gap-2 bg-surface-base rounded border border-surface-border px-3 py-2.5">
          <code className="text-sm font-mono text-text-primary flex-1">
            skillpm skillset install {skillset.name}
          </code>
          <CopyButton text={`skillpm skillset install ${skillset.name}`} />
        </div>
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {skillset.score !== null && (
          <div className="border border-surface-border rounded-lg p-4 bg-surface-raised col-span-2">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
              Format score
            </p>
            <ScoreBar score={skillset.score} />
          </div>
        )}

        {/* Only when members were actually checked. A skillset with none has no coherence to
            report, which is not the same as scoring zero — rendering an empty red bar would
            accuse it of something it was never measured for. */}
        {skillset.coherence !== null && skillset.coherence.members_checked > 0 && (
          <div className="border border-surface-border rounded-lg p-4 bg-surface-raised col-span-2">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
              Coherence
            </p>
            <CoherenceBar coherence={skillset.coherence} />
          </div>
        )}

        <div className="border border-surface-border rounded-lg p-4 bg-surface-raised">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Skills</p>
          <p className="text-sm font-mono text-text-primary">{skillset.skill_count}</p>
        </div>

        <div className="border border-surface-border rounded-lg p-4 bg-surface-raised">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Installs</p>
          <p className="text-sm font-mono text-text-primary">{skillset.install_count.toLocaleString()}</p>
        </div>

        <div className="border border-surface-border rounded-lg p-4 bg-surface-raised">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Spec</p>
          <p className="text-sm font-mono text-text-primary">v{skillset.spec_version}</p>
        </div>

        {skillset.author && (
          <div className="border border-surface-border rounded-lg p-4 bg-surface-raised">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Author</p>
            <a
              href={`https://github.com/${skillset.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-term-green hover:underline"
            >
              @{skillset.author}
            </a>
          </div>
        )}

        <div className="border border-surface-border rounded-lg p-4 bg-surface-raised">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Published</p>
          <p className="text-sm font-mono text-text-primary">{publishedDate}</p>
        </div>
      </div>

      {/* Included skills */}
      {skillset.skills.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
            Included skills
          </p>
          <div className="divide-y divide-surface-border border border-surface-border rounded-lg overflow-hidden">
            {skillset.skills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between px-4 py-3 bg-surface-raised">
                <Link
                  // Bare name: skill_refs carry no owner. /registry/{name} is the
                  // resolver, which redirects when the name is unique and shows a
                  // disambiguation list when it is not.
                  href={`/registry/${skill.name}`}
                  className="text-sm font-mono text-term-green hover:underline"
                >
                  {skill.name}
                </Link>
                <a
                  href={skill.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-text-muted hover:text-text-secondary truncate max-w-xs"
                >
                  {skill.source_url.replace('https://github.com/', '')}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {skillset.tags.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            {skillset.tags.map((tag) => (
              <Link
                key={tag}
                href={`/registry/skillsets?q=${encodeURIComponent(tag)}`}
                className="text-xs font-mono px-2.5 py-1 bg-surface-raised border border-surface-border rounded hover:border-term-green transition-colors text-text-secondary"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Source */}
      <div className="border border-surface-border rounded-lg p-4 bg-surface-raised">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Source</p>
        <a
          href={skillset.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-term-green hover:underline break-all"
        >
          {skillset.source_url}
        </a>
      </div>
    </div>
  )
}
