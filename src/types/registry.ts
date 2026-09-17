// API response shape from the registry backend
export type RegistrySkill = {
  name: string
  /** The authored name before slugification. 6.7% of imported names differ from `name`. */
  display_name: string | null
  /**
   * Names are unique only within an owner — 41.5% of corpus names collide on the bare name —
   * so every link to a skill must carry the owner.
   */
  owner: string
  /** "owner/name". How the registry addresses a skill. */
  qualified_name: string
  description: string
  author: string | null
  source_url: string
  trust_tier: 'verified' | 'community'
  score: number | null
  spec_version: string
  tags: string[]
  install_count: number
  published_at: string
}

/**
 * How well a skillset's members agree with each other.
 *
 * The second dimension beside `score`, and independent of it: `score` is conformance — the
 * skillset is well-formed — while this is coherence, whether the skills bundled together
 * actually agree on the conventions the skillset declares. A perfectly-formatted skillset can
 * bundle skills that contradict one another, and it would score 100 with members disagreeing.
 *
 * `declared_conventions` is what makes the fraction interpretable and must be shown with it.
 * With conventions declared, "4/4" means every member restated them consistently. With none
 * declared there is nothing to restate, so it only means no member contradicted another — much
 * weaker evidence for the same-looking number.
 */
export type SkillsetCoherence = {
  members_checked: number
  members_coherent: number
  /** null when no members were checked. Not zero — there is nothing to report, not a failure. */
  pct: number | null
  pass_count: number
  warn_count: number
  error_count: number
  declared_conventions: number
}

export type RegistrySkillset = {
  name: string
  description: string
  author: string | null
  source_url: string
  trust_tier: 'verified' | 'community'
  score: number | null
  spec_version: string
  tags: string[]
  skill_count: number
  install_count: number
  published_at: string
  skills: Array<{ name: string; source_url: string }>
  /** null for a skillset published before the registry recorded coherence. */
  coherence: SkillsetCoherence | null
}

// Search options matching GET /skills and GET /skillsets query params
export type SearchOptions = {
  q?: string
  tier?: string
  sort?: string
  tags?: string
  owner?: string
  /** Provenance filter. Unset searches the whole registry, which is the default. */
  source?: 'seeded' | 'imported' | 'published'
  limit?: number
  offset?: number
}

/**
 * Paginated list envelope.
 *
 * `total_relation` is the important field: "eq" means `total` is exact, "gte" means the count
 * stopped at the cap and there are at least that many. Render "gte" as "1,000+" (the cap since the
 * registry's D27), never as a bare 1000 — see COUNTING_AT_SCALE.md in the registry repo.
 */
export type ListEnvelope = {
  total: number
  total_relation: 'eq' | 'gte'
  has_more: boolean
  limit: number
  offset: number
  max_offset: number
}

export type SkillSearchResult = ListEnvelope & { skills: RegistrySkill[] }
export type SkillsetSearchResult = ListEnvelope & { skillsets: RegistrySkillset[] }

export type RegistryStats = {
  skills: { total: number; curated: number; imported: number; verified: number }
  skillsets: { total: number }
  owners: number
  updated_at: string | null
}

export type TagCount = { tag: string; skill_count: number }

/**
 * Result of resolving a bare, unqualified skill name.
 *
 * A discriminated union rather than `RegistrySkill | null`, because the registry answers a
 * contested name with 409 AMBIGUOUS_NAME — and collapsing that into null is what made every
 * contested skill render as a 404.
 */
export type BareNameResolution =
  | { status: 'ok'; skill: RegistrySkill }
  | { status: 'ambiguous'; owners: string[] }
  | { status: 'not_found' }
  | { status: 'error' }

// Legacy component-level type — kept for RegistryPreview backward compat
export type SkillCard = {
  name: string
  description: string
  tier: 'Verified' | 'Community'
  score: number | null
  specVersion: string
  installCommand: string
  sourceUrl: string
  installCount: number
}
