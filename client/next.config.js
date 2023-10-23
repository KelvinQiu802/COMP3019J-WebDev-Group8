/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.doubanio.com',
      },
    ],
  },
};

module.exports = nextConfig;
