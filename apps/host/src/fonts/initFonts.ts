import localFont from "next/font/local";

export const inter = localFont({
  preload: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
  src: [
    {
      path: "./Inter-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});
