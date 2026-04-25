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
      <body className="min-h-screen flex flex-col antialiased relative overflow-x-hidden">
        {/* Warm radial glows — fixed so they persist across all routes */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-[300px] -right-[200px] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,138,31,0.16)_0%,rgba(255,138,31,0.04)_35%,transparent_70%)] blur-[20px]" />
          <div className="absolute top-[600px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,200,100,0.06)_0%,transparent_60%)] blur-[40px]" />
        </div>
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
