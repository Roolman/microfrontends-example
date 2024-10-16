import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mf-example/utils", "@mf-example/styles", "@trutoo/event-bus", "@mf-example/events"],
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "cards",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./cards-section": "./src/components/CardsSection",
          "./image-popup": "./src/components/ImagePopup",
          "./add-place-popup": "./src/components/AddPlacePopup",
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
