import type { MetadataRoute } from 'next'

/**
 * Keep crawlers off filtered registry URLs.
 *
 * Every `/registry?…` URL is a distinct query against the registry API, and each tag chip and sort
 * link combines with whatever filters are already in the URL — so a crawler following links reaches
 * an unbounded number of them, each a cache miss. Before the registry's D26 query fixes a single tag
 * or community-tier listing read over 3 million database rows; after them it is thousands, but a
 * crawl is still pure cost with nothing worth indexing. Skill and owner pages stay crawlable: they
 * are single indexed lookups and the pages people actually search for.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/registry?', '/api/'],
    },
  }
}
