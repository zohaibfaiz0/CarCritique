import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This will match any hostname
        port: '', // No specific port
      },
      {
        protocol: 'http',
        hostname: '**', // This will match any hostname
        port: '', // No specific port
      },
    ],
  },
};

export default nextConfig;