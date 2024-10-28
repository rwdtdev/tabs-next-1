/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/tabs",
        destination: "/tabs/tab-1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
