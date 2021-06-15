import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
import ReactCompareImage from 'react-compare-image';
import Layout from '../../components/Layout';
import { addPresetToCookieById } from '../../util/cookies';

export default function SinglePreset(props) {
  const [addedPreset, setAddedPreset] = useState(props.addedPreset);
  const [cartNr, setCartNr] = useState(props.testCookie.length);

  const before = props.preset.imageBefore;
  const after = props.preset.imageAfter;

  return (
    <Layout cartNr={cartNr}>
      <Head>
        <title>{props.preset.filterName}</title>
      </Head>
      <div className="preset-page">
        <h1>{props.preset.filterName}</h1>
        <div>filter id: {props.preset.id}</div>
        <div style={{ maxWidth: '640px' }}>
          <ReactCompareImage leftImage={before} rightImage={after} />
        </div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setAddedPreset(addPresetToCookieById(props.preset.id));
            setCartNr(Cookies.getJSON('addedPreset').length);
          }}
        >
          <input
            className="input"
            placeholder="Add an amount"
            type="number"
            min="1"
          />
          <button type="submit" className="search">
            Add to Cart
          </button>
        </form>
        {/* <button
        onClick={() => {
          // cookies.set('addedPreset', [props.preset]);
          setAddedPreset(toggleBuyPresetByPresetId(props.preset.id));
          setCartNr(Cookies.getJSON('addedPreset').length);
        }}
      >
        {addedPreset.includes(props.preset.id) ? 'Remove' : 'Add'}
      </button> */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const presetId = context.query.presetId;

  const { presets } = await import('../../util/database');
  const testCookie = context.req.cookies.addedPreset
    ? JSON.parse(context.req.cookies.addedPreset)
    : [];

  const preset = presets.find((p) => p.id === presetId);

  // console.log(context.req.cookies.addedPreset);

  return {
    props: {
      preset: preset,
      addedPreset: context.req.cookies.addedPreset || [],
      testCookie: testCookie,
    },
  };
}
