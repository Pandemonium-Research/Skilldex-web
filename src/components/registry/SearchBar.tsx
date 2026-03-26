'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const PER_PAGE_OPTIONS = [20, 50, 100]

type Props = {
  defaultQ?: string
  defaultTier?: string
  defaultSort?: string
  defaultLimit?: number
}

export function SearchBar({ defaultQ, defaultTier, defaultSort, defaultLimit }: Props) {
  const router = useRouter()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function pushParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams()
    const merged = {
      q: defaultQ,
      tier: defaultTier,
      sort: defaultSort,
      limit: defaultLimit ? String(defaultLimit) : undefined,
      ...updates,
    }
    if (merged.q) params.set('q', merged.q)
    if (merged.tier) params.set('tier', merged.tier)
    if (merged.sort && merged.sort !== 'installs') params.set('sort', merged.sort)
    if (merged.limit && merged.limit !== '20') params.set('limit', merged.limit)
    // reset to page 1 on any filter change
    router.push(`/registry${params.size ? `?${params.toString()}` : ''}`)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      pushParams({ q: e.target.value.trim() || undefined })
    }, 300)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        defaultValue={defaultQ}
        onChange={handleSearch}
        placeholder="Search skills..."
        className="flex-1 bg-surface-raised border border-surface-border rounded px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-term-green transition-colors"
      />

      <div className="flex gap-2">
        <select
          defaultValue={defaultTier ?? ''}
          onChange={(e) => pushParams({ tier: e.target.value || undefined })}
          className="bg-surface-raised border border-surface-border rounded px-3 py-2 text-sm font-mono text-text-secondary focus:outline-none focus:border-term-green transition-colors"
        >
          <option value="">All tiers</option>
          <option value="verified">Verified</option>
          <option value="community">Community</option>
        </select>

        <select
          defaultValue={defaultSort ?? 'installs'}
          onChange={(e) => pushParams({ sort: e.target.value })}
          className="bg-surface-raised border border-surface-border rounded px-3 py-2 text-sm font-mono text-text-secondary focus:outline-none focus:border-term-green transition-colors"
        >
          <option value="installs">Most installed</option>
          <option value="score">Highest score</option>
          <option value="recent">Recently added</option>
          <option value="name">Alphabetical</option>
        </select>

        <select
          defaultValue={defaultLimit ?? 20}
          onChange={(e) => pushParams({ limit: e.target.value })}
          className="bg-surface-raised border border-surface-border rounded px-3 py-2 text-sm font-mono text-text-secondary focus:outline-none focus:border-term-green transition-colors"
        >
          {PER_PAGE_OPTIONS.map((n) => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>
      </div>
    </div>
  )
}
