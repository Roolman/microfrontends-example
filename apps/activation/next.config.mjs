import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mf-example/utils", '@trutoo/event-bus'],
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "activation",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./logout-button": "./src/components/LogoutButton",
          "./signin": "./src/pages/signin",
          "./signup": "./src/pages/signup",
          "./pages-map": "./pages-map.js"
        },
        extraOptions: {
          exposePages: true,
        },
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
