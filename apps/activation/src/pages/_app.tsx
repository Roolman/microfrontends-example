import "@mf-example/ui/styles/globals.css";
import "@mf-example/ui/styles/normalize.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
