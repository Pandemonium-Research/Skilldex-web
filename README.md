# Skilldex Web

> The official marketing and documentation website for Skilldex — the package manager for agent skills.

## 🎯 Overview

Skilldex Web is a Next.js-based website that serves as the central hub for the Skilldex ecosystem. It provides:

- **Landing page** showcasing the Skilldex platform and its core benefits
- **Comprehensive documentation** including CLI reference, concepts, and publishing guides
- **Installation instructions** for the Skilldex CLI across multiple platforms
- **Registry browser** for searching the skill registry and viewing each skill and skillset
- **Educational content** about skill creation, validation, and best practices

This repository hosts the website infrastructure while the CLI tool and registry backend are maintained separately.

## 🚀 What is Skilldex?

Skilldex solves a fundamental problem in the Claude Code ecosystem: **how to package, share, and discover reusable AI agent instruction sets (skills)**.

Think of it like npm, but for AI agent capabilities instead of JavaScript libraries:

- **Skills** are folders built around a `SKILL.md` — instructions and resources that extend what a coding agent can do
- **The CLI** (`skillpm`) searches, installs, validates, and publishes skills, and links them into the directories Claude Code, Codex, Cursor, and other agents read
- **The Registry** indexes skills published on GitHub, addressed as `owner/name`, each scored for format conformance
- **The Validator** scores every skill against the skill format specification

### The Problem Skilldex Solves

1. **No central home** — Skills live scattered across projects with no standard way to share them
2. **No install command** — Sharing a skill means attaching files to messages, no versioning or distribution
3. **No quality signal** — No way to know if a skill follows the format agents expect

## 📁 Project Structure

```
skilldex-web/
├── src/
│   ├── app/                          # Next.js application routes
│   │   ├── layout.tsx               # Root layout with navbar and footer
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css              # Global styles (Tailwind)
│   │   ├── docs/                    # Documentation pages
│   │   │   ├── layout.tsx           # Docs layout with sidebar
│   │   │   ├── page.tsx             # Docs index
│   │   │   └── [...slug]/page.tsx   # Dynamic doc pages
│   │   ├── install/                 # CLI installation page
│   │   │   └── page.tsx
│   │   ├── registry/                # Registry browser: search, /registry/[owner]/[name], skillsets
│   │   ├── api/registry/skills/     # Proxy for the registry browser's "load more"
│   │   └── robots.ts                # Keeps crawlers off filtered registry URLs
│   ├── components/
│   │   ├── landing/                 # Landing page sections
│   │   │   ├── Hero.tsx             # Hero: CLI version from npm, skill count from registry stats
│   │   │   ├── CommandPaletteMock.tsx # Search mock in the hero
│   │   │   ├── ProblemSection.tsx   # Problem statement
│   │   │   ├── HowItWorks.tsx       # 3-step workflow visualization
│   │   │   ├── TerminalDemo.tsx     # Terminal demo, mirroring skillpm's real output
│   │   │   ├── RegistryPreview.tsx  # Most-installed skills, live from the registry
│   │   │   └── InstallStrip.tsx     # Install tabs strip (not currently on the page)
│   │   ├── docs/                    # Documentation components
│   │   │   ├── DocsSidebar.tsx      # Navigation sidebar
│   │   │   ├── DocsSidebarClient.tsx # Client-side sidebar logic
│   │   │   ├── DocsPager.tsx        # Previous/next page navigation
│   │   │   └── MdxContent.tsx       # MDX content renderer
│   │   ├── install/
│   │   │   └── InstallTabs.tsx      # Platform selection tabs
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Site navigation
│   │   │   └── Footer.tsx           # Site footer
│   │   └── ui/                      # Reusable UI components
│   │       ├── Badge.tsx            # Badge component
│   │       ├── CodeBlock.tsx        # Syntax-highlighted code
│   │       ├── CopyButton.tsx       # Copy-to-clipboard button
│   │       └── TabSwitcher.tsx      # Tab switcher component
│   ├── content/
│   │   └── docs/                    # MDX documentation files
│   │       ├── cli/                 # One page per command: install, uninstall, list, search,
│   │       │                        #   update, validate, init, publish, suggest, skillset, config, mcp
│   │       ├── concepts/            # Core concepts
│   │       │   ├── manifest.mdx
│   │       │   ├── quality-scoring.mdx
│   │       │   ├── scopes.mdx
│   │       │   └── skill-format.mdx
│   │       ├── getting-started/     # Onboarding guides
│   │       │   ├── index.mdx
│   │       │   ├── installation.mdx
│   │       │   ├── quick-reference.mdx
│   │       │   └── first-skill.mdx
│   │       └── publishing/          # Publishing guides
│   │           ├── creating-a-skill.mdx
│   │           └── publishing-to-registry.mdx
│   ├── lib/
│   │   ├── docs.ts                  # Parsing, organizing, and navigating MDX files
│   │   ├── registry.ts              # Registry API client (REGISTRY_URL)
│   │   ├── cli-version.ts           # Latest skilldex-cli version from npm
│   │   └── format.ts                # Count formatting ("1,000+", "1.6M+")
│   └── types/
│       ├── docs.ts                  # Type definitions for documentation
│       └── registry.ts              # Type definitions for registry data
├── public/                          # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── next.config.mjs                 # Next.js configuration
└── README.md
```

## 🏗️ Architecture & Technology Stack

### Core Technologies

- **Next.js 14.2** — React framework with app router, SSR, and static generation
- **React 18** — UI library
- **TypeScript** — Static type checking for robust code quality
- **Tailwind CSS 3** — Utility-first styling framework
- **MDX** — Markdown with JSX for rich documentation content

### Key Libraries

- **next-mdx-remote** — Renders MDX content dynamically
- **gray-matter** — Parses YAML frontmatter from MDX files
- **shiki** — Syntax highlighting for code blocks with theme support
- **clsx** — Utility for conditional classNames
- **tailwind-merge** — Merges Tailwind class names intelligently

### Design Decisions

1. **MDX for Documentation** — Allows embedding React components within markdown, enabling interactive docs
2. **Static Site Generation** — Most pages are pre-rendered at build time for optimal performance
3. **File-based Routing** — Documentation structure mirrors filesystem structure for maintainability
4. **Tailwind CSS** — Rapid development with consistent design tokens

## 🎨 Key Features

### 1. Landing Page

- **Hero Section** — Introduces Skilldex, with the current CLI version and the registry's skill count
- **Problem Statement** — Illustrates what Skilldex solves
- **How It Works** — 3-step workflow with code examples
- **Terminal Demo** — An install and list, as `skillpm` prints them
- **Registry Preview** — The most-installed skills, live from the registry

### 2. Documentation Site

- **Sidebar Navigation** — Auto-generated from document frontmatter
- **Multi-section organization**:
  - Getting Started — Onboarding and basic setup
  - Concepts — Core ideas (skill format, quality scoring, scopes)
  - CLI Reference — Complete command documentation
  - Publishing — Guides for creating and publishing skills
- **Page Navigation** — Previous/next page links
- **Rich Content** — Syntax-highlighted code blocks, badges, callouts

### 3. Installation Page

- **Install Tabs** — npm (all platforms), Homebrew (via `brew tap pandemonium-research/skilldex`, macOS/Linux), curl (`install.sh`, macOS/Linux), Scoop (via `scoop bucket add skilldex`, Windows)
- **Clear Instructions** — Step-by-step setup guides

### 4. UI Components

- **CodeBlock** — Syntax-highlighted code with copy button (using Shiki)
- **CopyButton** — One-click copy-to-clipboard for code
- **TabSwitcher** — Content tabs for comparing options
- **Badge** — Labels for skill tiers (Verified, Community)
- **Responsive Design** — Mobile-first, works across all devices

## 📖 Documentation Structure

All documentation is stored as MDX files in `src/content/docs/` with YAML frontmatter:

```yaml
---
title: "Page Title"
description: "Brief description for metadata"
section: "Section Name" # e.g., "Getting Started", "Concepts", "CLI Reference"
order: 1 # Sort order within section
editUrl?: "github.com/..." # Optional link to edit on GitHub
---
# Content goes here...
```

The documentation system automatically:

- Parses frontmatter and file structure
- Generates navigation trees by section
- Creates page slugs from file paths (`/docs/section/page`)
- Indexes all documents for navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Pandemonium-Research/Skilldex-web.git
cd Skilldex-web

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the static site
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## 🔧 Development

### Adding Documentation

1. Create a new `.mdx` file in `src/content/docs/` (in the appropriate section folder)
2. Add required frontmatter (title, description, section, order)
3. Write markdown content with optional JSX components
4. The site will automatically detect and route the new page

Example:

```mdx
---
title: "My New Guide"
description: "A guide about something useful"
section: "Getting Started"
order: 5
---

# My New Guide

Here's some content with a [code block](my-file.ts).
```

### Adding Components

1. Create new component in `src/components/` in the appropriate subdirectory
2. Use TypeScript for type safety
3. Style with Tailwind CSS classes
4. Export from component file for use in pages/layouts

### Styling

The project uses Tailwind CSS with custom design tokens defined in `tailwind.config.ts`:

- Color palette (brand, surface, text, terminal colors)
- Typography scales
- Spacing system
- Responsive breakpoints

## 📋 Key Concepts

### Skills

A skill is a directory with a `SKILL.md`: YAML frontmatter (`name` and `description` are required) followed by the instructions an agent follows, plus optional `scripts/`, `references/`, and `assets/`.

### Quality Scoring

A 0–100 format conformance score from `@skilldex/validator`: eleven checks on the frontmatter, name, description, length, folder layout, and referenced files, weighted from the specification. See `src/content/docs/concepts/quality-scoring.mdx`.

### Skill Scopes

Three installation scopes, each linked into the agent directories at its level:

- **Project** (default) — `<project>/.skilldex/`, linked into the project's `.agents/skills` and `.claude/skills`
- **Shared** — `~/.skilldex/shared/`, linked into your home directory's agent directories
- **Global** — `~/.skilldex/global/`, linked into your home directory's agent directories

### Spec Version

The skill format spec is at 1.0 and the skillset spec at 1.1 (`SPEC_VERSION` and `SKILLSET_SPEC_VERSION` in `@skilldex/validator`).

## 🔗 Related Repositories

- **[CLI Tool](https://github.com/Pandemonium-Research/Skilldex)** — The `skillpm` command-line interface (`npm install -g skilldex-cli`)
- **[Homebrew Tap](https://github.com/Pandemonium-Research/homebrew-skilldex)** — `brew tap pandemonium-research/skilldex && brew install skilldex-cli` (macOS/Linux)
- **[Scoop Bucket](https://github.com/Pandemonium-Research/scoop-skilldex)** — `scoop bucket add skilldex https://github.com/Pandemonium-Research/scoop-skilldex && scoop install skilldex-cli` (Windows)
- **[npm Package](https://www.npmjs.com/package/skilldex-cli)** — Published package on npm (all platforms)
- **[Registry Backend](https://github.com/Pandemonium-Research/Skilldex-registry)** — The registry API the site reads from (`REGISTRY_URL`, default `https://skilldex-registry.vercel.app/v1`)

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- **Documentation** — More guides, examples, and tutorials
- **Components** — New UI components for docs or landing
- **Localization** — Support for multiple languages
- **SEO** — Improved metadata and structured data

## 📄 License

MIT License — Skilldex is open source and free to use.

---

**Learn more:** Visit [skilldex-web.vercel.app](https://skilldex-web.vercel.app) or read the full documentation for detailed guides and API reference.
