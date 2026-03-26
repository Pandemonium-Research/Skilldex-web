export type DocFrontmatter = {
  title: string
  description: string
  section: string
  order: number
  editUrl?: string
}

export type DocMeta = DocFrontmatter & {
  slug: string[]
  href: string
}

export type DocPage = DocMeta & {
  source: string
}

export type NavItem = {
  title: string
  href: string
  order: number
}

export type NavSection = {
  title: string
  items: NavItem[]
}
