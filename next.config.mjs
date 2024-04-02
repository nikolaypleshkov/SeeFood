/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",    
        remotePatterns: [
          {
            protocol: "https",
            hostname: "tailwindui.com",
            port: "",
            pathname: "/img/logos/**",
          },
        ],
    }
};

export default nextConfig;
