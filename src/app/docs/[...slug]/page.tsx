import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllDocs, getDocBySlug } from '@/lib/docs'
import { MdxContent } from '@/components/docs/MdxContent'
import { DocsPager } from '@/components/docs/DocsPager'

type Props = {
  params: { slug: string[] }
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDocBySlug(params.slug)
  if (!doc) return {}

  return {
    title: doc.title,
    description: doc.description,
  }
}

export default function DocPage({ params }: Props) {
  const doc = getDocBySlug(params.slug)
  if (!doc) notFound()

  return (
    <article className="max-w-3xl">
      <MdxContent source={doc.source} />
      <DocsPager currentSlug={params.slug} />
    </article>
  )
}
