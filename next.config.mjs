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
  },
  distDir: 'dist',  // <-- here, at the top level
}

export default nextConfig
