import type { NextConfig } from "next";
import { createRequire } from "node:module";
import path from "path";
import { fileURLToPath } from "node:url";

const configDir =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const require = createRequire(path.join(configDir, "package.json"));
const tailwindcssDir = path.dirname(
  require.resolve("tailwindcss/package.json"),
);
const twAnimateDir = path.join(configDir, "node_modules", "tw-animate-css");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(configDir),
    // Turbopack đôi khi resolve package CSS với context thư mục cha (CS2SkinProfit) — alias ép về node_modules app
    resolveAlias: {
      tailwindcss: tailwindcssDir,
      "tw-animate-css": twAnimateDir,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.coingecko.com",
            }, {
                protocol: "https",
                hostname: "coin-images.coingecko.com",
            },
        ]
    }
};

export default nextConfig;
