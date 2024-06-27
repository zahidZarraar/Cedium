import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https"
      },
      {
        hostname: "red-rainy-koi-23.mypinata.cloud",
        protocol: "https"
      }
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
