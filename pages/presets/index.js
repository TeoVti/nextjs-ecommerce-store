import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { sumOfPresetsQuantity } from '../../util/sumOfPresetsQuantity';

export default function Products(props) {
  return (
    <Layout
      cartNr={props.testCookie
        .map((i) => i.quantity)
        .reduce((a, b) => a + b, 0)}
    >
      <Head>
        <title>Presets</title>
      </Head>
      <div className="presets-page">
        <ul>
          <div className="container">
            {props.presets.map((preset) => (
              <div key={`preset-${preset.id}`}>
                <li style={{ listStyleType: 'none' }}>
                  <Link href={`/presets/${preset.id}`}>
                    <div>
                      <img
                        src={preset.imageAfter}
                        style={{ width: '350px' }}
                      ></img>
                      <div className="see-presets-button">
                        <div>
                          <p>{preset.filterName}</p>
                        </div>
                        <div className="presets-see-preset">
                          <button className="presets-btnn">See Preset</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { presets } = await import('../../util/database');
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
