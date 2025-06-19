import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wikimedia.org',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '**.blender.org',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '**.wikimedia.org',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '**.flixster.com',
        port: '',
        search: '',
      }
    ],
  },
};

export default nextConfig;
