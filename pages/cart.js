import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { removePresetToCookieById } from '../util/cookies';

export default function Cart(props) {
  const [products, setProducts] = useState(props.products);
  console.log(products);

  return (
    <Layout cartNr={products.length}>
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
                    removePresetToCookieById(product.id),
                      setProducts(products.filter((prd) => prd !== product));
                  }}
                >
                  Remove item
                </button>
              </li>
            ))}
          </ul>
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
  console.log(testCookie);
  const products = testCookie.map((item) =>
    presets.find((preset) => preset.id === item.id),
  );
  console.log(products);
  return {
    props: {
      products: products || [],
    },
  };
}
