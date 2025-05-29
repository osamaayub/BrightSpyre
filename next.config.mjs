/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resume.brightspyre.com',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  }}

export default nextConfig
