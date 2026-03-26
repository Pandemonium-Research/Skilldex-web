export type SkillCard = {
  name: string
  description: string
  tier: 'Verified' | 'Community'
  score: number
  specVersion: string
  installCommand: string
  sourceUrl: string
  installCount: number
}
