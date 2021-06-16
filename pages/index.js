import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const heroStyles = css`
  background-image: url('/hero33.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
  width: 100wv;
`;

export default function Home(props) {
  return (
    <Layout
      cartNr={props.testCookie
        .map((i) => i.quantity)
        .reduce((a, b) => a + b, 0)}
    >
      <Head>
        <title>Home</title>
      </Head>
      <div css={heroStyles}>
        <div id="nc-main" className="nc-main bg-cover bg-cc">
          <div className="full-wh">
            <div className="bg-animation">
              <div id="stars"></div>
              <div id="stars2"></div>
              <div id="stars3"></div>
              <div id="stars4"></div>
            </div>
          </div>
        </div>
        <p className="hero-text">
          Make your photos look professional fast and easy
        </p>
        {/* <button className="hero-button">
          <a href="/presets">See Presets</a>
  </button>*/}

        <div className="hero-button">
          <Link href="/presets">
            <a className="presets-btn">See Presets</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { presets } = await import('../util/database');
  const testCookie = context.req.cookies.addedPreset
    ? JSON.parse(context.req.cookies.addedPreset)
    : [];
  return {
    props: {
      presets: presets,
      testCookie: testCookie,
    },
  };
}
