import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Products(props) {
  return (
    <Layout>
      <Head>
        <title>Presets</title>
      </Head>
      Products Page
      <ul>
        {props.presets.map((preset) => (
          <li key={`preset-${preset.id}`}>
            <Link href={`/presets/${preset.id}`}>
              <a>{preset.filterName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { presets } = await import('../../util/database');
  console.log('users', presets);
  return {
    props: {
      presets: presets,
    },
  };
}
