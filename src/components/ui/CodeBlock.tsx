import { getSingletonHighlighter } from 'shiki'
import { CopyButton } from './CopyButton'

type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
}

export async function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const highlighter = await getSingletonHighlighter({
    themes: ['github-dark'],
    langs: ['bash', 'typescript', 'javascript', 'json', 'yaml', 'shell', 'text', 'markdown'],
  })

  const html = highlighter.codeToHtml(code.trim(), {
    lang: language,
    theme: 'github-dark',
  })

  return (
    <div className="relative rounded-md overflow-hidden border border-surface-border bg-[#0d1117]">
      {filename && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-border bg-surface-raised">
          <span className="text-xs font-mono text-text-muted">{filename}</span>
        </div>
      )}
      <div className="absolute top-1.5 right-1.5 z-10">
        <CopyButton text={code.trim()} />
      </div>
      <div
        className="overflow-x-auto text-[13px] [&>pre]:px-3 [&>pre]:py-2.5 [&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
