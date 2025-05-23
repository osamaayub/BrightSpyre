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
    allowedDevOrigins: ['http://13.213.30.63:3000'], // Add any origin accessing your dev server
}

export default nextConfig
