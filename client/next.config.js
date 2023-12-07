/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.doubanio.com',
      },
      {
        hostname: 'http.cat',
      },
    ],
  },
};

module.exports = nextConfig;
