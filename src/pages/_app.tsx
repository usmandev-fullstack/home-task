import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import UserLayout from "@/@core/layouts/UserLayout";

import Head from "next/head";
import { Router } from "next/router";

// ** Store Imports
import { store } from "@/store";
import { Provider } from "react-redux";

import themeConfig from "@/configs/themeConfig";

// ** Global css/scss styles
import "../styles/globals.css";
import "../styles/global.scss";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props;

  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));

  return (
    <Provider store={store}>
      <Head>
        <title>{`${"Admin Panel"}`}</title>
        <meta
          name="description"
          content={`${"Admin Panel"} – Platform for students, AlNayzak management, and instructors to utilize from admission procedure, interviews, courses, exams, and degree issuance to utilize as an alumni portal and post-graduation activities.`}
        />
        <meta name="keywords" content="Alnayzak" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
        />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
