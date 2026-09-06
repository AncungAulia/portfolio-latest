import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Dev only: Next blocks cross-origin requests to dev assets, which breaks the
     tunnel used to open the dev server on a phone. Has no effect on a build. */
  allowedDevOrigins: [
    "tendentiously-impalpable-dede.ngrok-free.dev",
    "*.ngrok-free.dev",
  ],
};

export default nextConfig;
