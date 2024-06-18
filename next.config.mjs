/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["i0.wp.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i0.wp.com',
                pathname: '**',
            },
        ],
    },
    trailingSlash: true,
};

export default nextConfig;
