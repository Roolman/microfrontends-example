import NextFederationPlugin from "@module-federation/nextjs-mf";

const CARDS_APP_URL =
  process.env.NEXT_PUBLIC_CARDS_APP_URL || "http://localhost:3001";

const ACTIVATION_APP_URL =
  process.env.NEXT_PUBLIC_ACTIVATION_APP_URL || "http://localhost:3002";
  
const USERS_APP_URL =
  process.env.NEXT_PUBLIC_USERS_APP_URL || "http://localhost:3003";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    cards: `cards@${CARDS_APP_URL}/_next/static/${location}/remoteEntry.js`,
    activation: `activation@${ACTIVATION_APP_URL}/_next/static/${location}/remoteEntry.js`,
    users: `users@${USERS_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@mf-example/ui", '@trutoo/event-bus'],
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: remotes(isServer),
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
        shared: {
          "@mf-example/utils": {
            requiredVersion: "1.0.0",
          },
          "@trutoo/event-bus": {
            singleton: true,
            requiredVersion: "2.3.0"
          },
        }
      })
    );

    return config;
  },
};

export default nextConfig;