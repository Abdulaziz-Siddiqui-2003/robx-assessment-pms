import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: {
    appIsrStatus: false,    // Hides the "Static/Dynamic" route badge
    buildActivity: false,   // Hides the compilation indicator
  },
};

export default nextConfig;