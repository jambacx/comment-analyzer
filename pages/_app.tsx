import { useEffect, type ReactElement, type ReactNode } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { baselightTheme } from "../src/theme/DefaultColors";
import store from "@src/redux/store";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
};

type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
};

const MyApp = (props: ExtendedAppProps) => {
  dotenv.config();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = baselightTheme;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`Smartdash`}</title>
          <meta name="description" content={`Smartdash`} />
          <meta name="keywords" content="Smartdash" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {/* <AuthGuard> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
        {/* </AuthGuard> */}
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;
