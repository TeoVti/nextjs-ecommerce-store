import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { removePresetToCookieById } from '../util/cookies';
import { sumOfPresetsQuantity } from '../util/sumOfPresetsQuantity';

export default function Cart(props) {
  const [products, setProducts] = useState(props.products);
  const [finalQuantity, setFinalQuantity] = useState(
    sumOfPresetsQuantity(props.testCookie),
  );
  const [testCookie, SetTestCookie] = useState(props.testCookie);

  return (
    <Layout cartNr={finalQuantity}>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div className="cart-page">
        Shopping Cart
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <a>{product.filterName}</a>
                <button
                  onClick={() => {
                    const newCookies = removePresetToCookieById(product.id);
                    // Removes a preset from the array of presets
                    const newValue = products.filter((prd) => prd !== product);
                    setProducts(newValue);
                    setFinalQuantity(sumOfPresetsQuantity(newCookies));
                    SetTestCookie(newCookies);
                  }}
                >
                  Remove item
                </button>
              </li>
            ))}
          </ul>
          <div>Total: {(finalQuantity * 7.9).toFixed(2)} $</div>
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
  const products = testCookie.map((item) =>
    presets.find((preset) => preset.id === item.id),
  );
  return {
    props: {
      testCookie: testCookie,
      products: products || [],
    },
  };
}
