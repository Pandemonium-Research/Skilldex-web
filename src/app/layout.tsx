import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Skilldex — The skill package manager for AI agents',
    template: '%s | Skilldex',
  },
  description:
    'Install, share, and discover Claude Code skills. Skilldex is the package manager for AI agent skills.',
  metadataBase: new URL('https://skilldex-web.vercel.app'),
  openGraph: {
    title: 'Skilldex — The skill package manager for AI agents',
    description:
      'Install, share, and discover Claude Code skills. Skilldex is the package manager for AI agent skills.',
    url: 'https://skilldex-web.vercel.app',
    siteName: 'Skilldex',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skilldex — The skill package manager for AI agents',
    description:
      'Install, share, and discover Claude Code skills.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
