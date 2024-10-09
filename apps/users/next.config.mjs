import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mf-example/utils", "@mf-example/styles", "@trutoo/event-bus"],
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "users",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./user-data": "./src/components/UserData",
          "./edit-avatar-popup": "./src/components/EditAvatarPopup",
          "./edit-profile-popup": "./src/components/EditProfilePopup",
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
