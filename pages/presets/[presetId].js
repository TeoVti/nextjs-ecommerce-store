import Head from 'next/head';
import Layout from '../../components/Layout';

export default function SinglePreset(props) {
  return (
    <Layout>
      <Head>
        <title>{props.preset.filterName}</title>
      </Head>

      <h1>{props.preset.filterName}</h1>
      <div>filter id: {props.preset.id}</div>
      <button>Add to cart</button>
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
