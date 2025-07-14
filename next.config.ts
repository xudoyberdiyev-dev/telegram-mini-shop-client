// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['andstat.uz', 'shop-bot.javohir-dev.uz'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'as2.ftcdn.net',
            },
            {
                protocol: 'https',
                hostname: 'andstat.uz',
            },
        ],
    },
};

module.exports = nextConfig;
