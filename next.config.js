/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Add rule for PDF worker
    config.module.rules.push({
      test: /pdf\.worker\.js$/,
      type: 'asset/resource'
    });

    return config;
  }
};

module.exports = nextConfig;
