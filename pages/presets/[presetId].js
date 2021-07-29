import Cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
import ReactCompareImage from 'react-compare-image';
import Layout from '../../components/Layout';
import { addPresetToCookieById } from '../../util/cookies';
import { sumOfPresetsQuantity } from '../../util/sumOfPresetsQuantity';

export default function SinglePreset(props) {
  const [cartNr, setCartNr] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const before = props.preset.imageBefore;
  const after = props.preset.imageAfter;

  return (
    <Layout cartNr={cartNr}>
      <Head>
        <title>{props.preset.filterName}</title>
      </Head>
      <div className="preset-page">
        <div className="left" style={{ maxWidth: '640px', marginLeft: '7em' }}>
          <ReactCompareImage leftImage={before} rightImage={after} />
        </div>
        <div className="left">
          <h1>{props.preset.filterName}</h1>
          <div>Price: {props.preset.price}$</div>

          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              const newValue = addPresetToCookieById(props.preset.id, quantity);
              setCartNr(sumOfPresetsQuantity(newValue));
            }}
          >
            <input
              onChange={(event) => setQuantity(event.target.value)}
              value={quantity}
              className="input"
              placeholder="Amount"
              type="number"
              min="1"
              style={{ width: '6em', borderRadius: '3px' }}
            />
            <button type="submit" className="presets-btnn">
              Add to Cart
            </button>
          </form>
        </div>
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
      addedPreset: context.req.cookies.addedPreset || null,
      testCookie: testCookie,
    },
  };
}
