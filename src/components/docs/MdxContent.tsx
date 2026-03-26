import { MDXRemote } from 'next-mdx-remote/rsc'
import { CodeBlock } from '@/components/ui/CodeBlock'
import React from 'react'

function MdxPre(props: React.ComponentPropsWithoutRef<'pre'>) {
  const children = props.children

  // Extract code element from pre > code
  const codeEl =
    React.isValidElement<{ className?: string; children?: string }>(children)
      ? children
      : null

  if (!codeEl) {
    return <pre {...props} />
  }

  const className = codeEl.props?.className ?? ''
  const language = className.replace('language-', '') || 'text'
  const code = codeEl.props?.children ?? ''

  if (typeof code !== 'string') {
    return <pre {...props} />
  }

  return <CodeBlock code={code} language={language} />
}

/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line react/display-name
const components = { pre: MdxPre as React.FC }

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
