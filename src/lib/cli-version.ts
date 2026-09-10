/**
 * The latest published `skilldex-cli` version, read from npm.
 *
 * The hero badge said "v1.0" while the CLI was on 1.4.x — a version typed by hand and never
 * updated. Read from the registry the CLI is published to, it cannot drift. Revalidated hourly:
 * releases are rare, and a badge an hour behind is harmless. Null when npm cannot be reached, so
 * the badge falls back to a line with no number rather than a wrong one.
 */
const NPM_LATEST = 'https://registry.npmjs.org/skilldex-cli/latest'

export async function getLatestCliVersion(): Promise<string | null> {
  try {
    const res = await fetch(NPM_LATEST, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const { version } = (await res.json()) as { version?: unknown }
    return typeof version === 'string' ? version : null
  } catch {
    return null
  }
}
