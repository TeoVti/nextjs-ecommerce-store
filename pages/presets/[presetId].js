import cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  getAddedPresetCookieValue,
  toggleBuyPresetByPresetId,
} from '../../util/cookies';

export default function SinglePreset(props) {
  const [addedPreset, setAddedPreset] = useState(getAddedPresetCookieValue());
  return (
    <Layout>
      <Head>
        <title>{props.preset.filterName}</title>
      </Head>

      <h1>{props.preset.filterName}</h1>
      <div>filter id: {props.preset.id}</div>
      <button
        onClick={() => {
          // cookies.set('addedPreset', [props.preset]);
          setAddedPreset(toggleBuyPresetByPresetId(props.preset));
        }}
      >
        {addedPreset.includes(props.preset.id) ? 'Unfollow' : 'Follow'}
      </button>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const presetId = context.query.presetId;

  const { presets } = await import('../../util/database');

  const preset = presets.find((p) => p.id === presetId);

  return {
    props: {
      preset: preset,
    },
  };
}
