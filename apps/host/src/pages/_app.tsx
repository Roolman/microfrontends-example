import Head from "next/head";
import '@trutoo/event-bus';
import { useCallback, useEffect, useState } from "react";

import { checkToken } from "@mf-example/utils";
import { useRouter } from "next/router";

import "@mf-example/ui/styles/globals.css";
import "@mf-example/ui/styles/normalize.css";
import "@mf-example/ui/styles/popup/popup.css";
import { UsersEvents } from '@mf-example/events/users';

import "@/styles/page/page.css";

import { inter } from "@/fonts/initFonts";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoTooltip from "@/components/InfoTooltip";

import type { AppContext, AppInitialProps, AppProps } from "next/app";
import type { Callback, Subscription } from "@trutoo/event-bus/dist/event-bus";
import App from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const onLoginOrRegisterSuccess: Callback<{ email: string }> = useCallback(({ payload }) => {
    setIsLoggedIn(true);
    setEmail(payload?.email || '');
    router.push("/");
  }, [])

  useEffect(() => {
    const subs: Subscription[] = [];

    eventBus.register(UsersEvents.LoginSuccess, { })
    eventBus.register(UsersEvents.RegisterSuccess, { })
    eventBus.register(UsersEvents.Logout, {})

    subs.push(eventBus.subscribe<{ email: string }>(UsersEvents.LoginSuccess, onLoginOrRegisterSuccess));
    subs.push(eventBus.subscribe<{ email: string }>(UsersEvents.RegisterSuccess, onLoginOrRegisterSuccess));

    subs.push(eventBus.subscribe(UsersEvents.Logout, () => {
      setIsLoggedIn(false);
      setEmail('');
      router.push("/signin");
    }));

    return () => {
      subs.forEach((sub) => sub.unsubscribe());
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((user) => {
          setEmail(user.data.email);
          setIsLoggedIn(true);
          router.push("/");      
        })
        .catch((err) => {
          router.push("/signin");
          localStorage.removeItem("jwt");
          console.log(err);
        });
    } else {
      router.push("/signin");
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Mf example"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main className={inter.className + " page__content"}>
        <Header isLoggedIn={isLoggedIn} email={email} /> 
        <Component {...pageProps} />
        <Footer />
        <InfoTooltip />
      </main>
    </>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx }
}
