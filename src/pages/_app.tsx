import * as React from "react";
import { Provider, webLightTheme, webDarkTheme } from "@cebus/react-components";
import { useLocalDefault, useThemeDetector, useGetLocal } from "../utils";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SSRProvider } from "@fluentui/react-utilities";
import { RendererProvider, createDOMRenderer } from "@griffel/react";
import { AppProvider } from "../context";

export default function App(props: AppProps & { renderer: any }) {
  const { Component, pageProps, renderer } = props;
  const isDarkTheme = useThemeDetector();

  const [isMounted, setIsMounted] = React.useState(false);

  // TODO: This should by System
  useLocalDefault("theme", "System");
  const userTheme = useGetLocal("theme");

  const findTheme = React.useCallback(
    (theme: string) => {
      switch (theme) {
        case "System":
          return isDarkTheme ? webDarkTheme : webLightTheme;
        case "Dark":
          return webDarkTheme;
        case "Light":
          return webLightTheme;
        default:
          return webLightTheme;
      }
    },
    [isDarkTheme]
  );

  const [theme, setTheme] = React.useState(findTheme(userTheme));

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setTheme(findTheme(userTheme));
  }, [isDarkTheme, findTheme, userTheme]);

  return (
    <>
      <Head>
        <title>czearing</title>
        <meta name="title" content="czearing" />
        <meta name="description" content="My personal blog" />
        <link rel="icon" type="image/svg+xml" href="/image/favicon.svg" />
      </Head>
      <style jsx global>{`
        body {
          background-color: ${theme.canvasColor};
          padding: 0px;
          margin: 0px;
        }
      `}</style>
      <RendererProvider renderer={renderer || createDOMRenderer()}>
        <SSRProvider>
          <AppProvider value={{ setTheme, findTheme }}>
            {isMounted && (
              <Provider theme={theme}>
                <Component {...pageProps} />
              </Provider>
            )}
          </AppProvider>
        </SSRProvider>
      </RendererProvider>
    </>
  );
}
