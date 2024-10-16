import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { revalidate } from "@module-federation/nextjs-mf/utils";

class MyDocument extends Document<DocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    if (ctx?.pathname && !ctx?.pathname?.endsWith('_error')) {
      await revalidate().then((shouldUpdate) => {
        if (shouldUpdate) {
          console.log('Hot Module Replacement (HMR) activated', shouldUpdate);
        }
      });
    }

    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;