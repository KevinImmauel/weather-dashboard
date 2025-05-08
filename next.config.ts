import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/weather',
        destination: 'https://kevin0vcx.pythonanywhere.com/data'
      },
    ]
  }
};

export default nextConfig;
