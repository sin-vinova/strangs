// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Sentry.init({
    dsn: "https://bb9cf87a2ed949f79402d493b8d8cc1a@o450208.ingest.sentry.io/5434448",
    integrations: [
        new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
});


function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp