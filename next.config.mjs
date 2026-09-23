/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  async redirects() {
    return [
      // Skills are not packaged: publishing registers a GitHub source. The page described
      // .skill archives that never existed.
      {
        source: '/docs/publishing/packaging',
        destination: '/docs/publishing/publishing-to-registry',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
