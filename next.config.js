/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                "source": "/proxy-api/:path*",
                "destination": "https://www.google.com/:path*"
            },
        ]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
