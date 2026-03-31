// API response shape from the registry backend
export type RegistrySkill = {
  name: string
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
}

// Search options matching GET /skills and GET /skillsets query params
export type SearchOptions = {
  q?: string
  tier?: string
  sort?: string
  limit?: number
  offset?: number
}

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
