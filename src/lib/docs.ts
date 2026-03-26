import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { DocFrontmatter, DocMeta, DocPage, NavSection } from '@/types/docs'

const DOCS_DIR = path.join(process.cwd(), 'src', 'content', 'docs')

function getSlugFromFilePath(filePath: string): string[] {
  const relative = filePath
    .replace(DOCS_DIR, '')
    .replace(/\\/g, '/')         // normalize Windows separators
    .replace(/^\//, '')           // remove leading slash
    .replace(/\.mdx?$/, '')       // remove extension

  // index files become their parent directory slug
  const parts = relative.split('/')
  if (parts[parts.length - 1] === 'index') {
    parts.pop()
  }

  return parts
}

function collectMdxFiles(dir: string): string[] {
  const results: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(fullPath))
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      results.push(fullPath)
    }
  }

  return results
}

export function getAllDocs(): DocMeta[] {
  const files = collectMdxFiles(DOCS_DIR)

  return files.map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const frontmatter = data as DocFrontmatter
    const slug = getSlugFromFilePath(filePath)
    const href = '/docs/' + slug.join('/')

    return {
      ...frontmatter,
      slug,
      href,
    }
  })
}

export function getDocBySlug(slug: string[]): DocPage | null {
  // Try exact path match first, then index file fallback
  const candidates = [
    path.join(DOCS_DIR, ...slug) + '.mdx',
    path.join(DOCS_DIR, ...slug) + '.md',
    path.join(DOCS_DIR, ...slug, 'index.mdx'),
    path.join(DOCS_DIR, ...slug, 'index.md'),
  ]

  const filePath = candidates.find((p) => fs.existsSync(p))
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as DocFrontmatter
  const href = '/docs/' + slug.join('/')

  return {
    ...frontmatter,
    slug,
    href,
    source: content,
  }
}

export function buildNavTree(): NavSection[] {
  const docs = getAllDocs()

  const sectionMap = new Map<string, DocMeta[]>()

  for (const doc of docs) {
    const section = doc.section ?? 'Other'
    if (!sectionMap.has(section)) {
      sectionMap.set(section, [])
    }
    sectionMap.get(section)!.push(doc)
  }

  const sections: NavSection[] = []

  for (const [title, items] of Array.from(sectionMap.entries())) {
    const sorted = items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    sections.push({
      title,
      items: sorted.map((d) => ({
        title: d.title,
        href: d.href,
        order: d.order ?? 99,
      })),
    })
  }

  // Sort sections by the minimum order of their items
  sections.sort((a, b) => {
    const minA = Math.min(...a.items.map((i) => i.order))
    const minB = Math.min(...b.items.map((i) => i.order))
    return minA - minB
  })

  return sections
}
