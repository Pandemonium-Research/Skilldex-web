import { getSingletonHighlighter, type ThemeRegistrationRaw } from 'shiki'
import { CopyButton } from './CopyButton'
import warmThemeJson from '@/lib/shiki-warm-theme.json'

const warmTheme = warmThemeJson as unknown as ThemeRegistrationRaw

type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
}

export async function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const highlighter = await getSingletonHighlighter({
    themes: [warmTheme],
    langs: ['bash', 'typescript', 'javascript', 'json', 'yaml', 'shell', 'text', 'markdown'],
  })

  const html = highlighter.codeToHtml(code.trim(), {
    lang: language,
    theme: 'warm',
  })

  return (
    <div className="relative rounded-md overflow-hidden border border-surface-border bg-surface-raised">
      {filename && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-border bg-surface-overlay">
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
