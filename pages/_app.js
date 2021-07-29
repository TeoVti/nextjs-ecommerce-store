import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { css, Global } from '@emotion/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
          }
        `}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
