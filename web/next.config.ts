import type { NextConfig } from "next";

// No basePath: site is served at custom domain root (zametka.pics).
// rybushkin.github.io/zametka-quiz/ will no longer work; use zametka.pics.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
