import { buildNavTree } from '@/lib/docs'
import { DocsSidebarClient } from './DocsSidebarClient'

export async function DocsSidebar() {
  const sections = buildNavTree()
  return <DocsSidebarClient sections={sections} />
}
