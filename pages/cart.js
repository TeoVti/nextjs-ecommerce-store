import Head from 'next/head';
import Link from 'next/link';
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
  console.log(testCookie);
  function update(array1, array2) {
    var findPerson = (id) => array2.find((person) => person.id === id);
    array1.forEach((person) => Object.assign(person, findPerson(person.id)));
  }
  update(testCookie, products);

  return (
    <Layout cartNr={finalQuantity}>
      <Head>
        <title>Shopping Cart</title>
      </Head>

      <div className="cart-page">
        <h1 style={{ textAlign: 'center' }}>Shopping Cart</h1>
        <div className="cart-sub-page" style={{ display: 'flex' }}>
          <div style={{ flex: '1' }}>
            <ul>
              {products.map((product) => (
                <li
                  key={product.id}
                  style={{
                    listStyleType: 'none',
                    position: 'relative',
                    marginBottom: '2em',
                    marginLeft: '12em',
                  }}
                >
                  <img
                    src={product.imageAfter}
                    style={{ width: '180px' }}
                  ></img>
                  <div className="cart-info">
                    <a>{product.filterName}</a>
                    <div style={{ fontSize: '0.8em', marginTop: '1em' }}>
                      Quantity{' '}
                      {
                        testCookie.filter((prod) =>
                          prod.id == product.id ? prod.quantity : '',
                        )[0].quantity
                      }
                    </div>
                    <button
                      className="rmv-button"
                      onClick={() => {
                        const newCookies = removePresetToCookieById(product.id);
                        // Removes a preset from the array of presets
                        const newValue = products.filter(
                          (prd) => prd !== product,
                        );
                        setProducts(newValue);
                        setFinalQuantity(sumOfPresetsQuantity(newCookies));
                        SetTestCookie(newCookies);
                      }}
                    >
                      Remove item
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>{' '}
          <div className="right-side">
            <h2
              style={{ marginTop: '0', textAlign: 'center', fontSize: '2em' }}
            >
              Order Summary
            </h2>
            <hr />
            <div className="items-nr">
              Items <div>{testCookie.length}</div>
            </div>

            <div style={{ fontSize: '2em', margin: '0.5em' }}>Promo Code</div>
            <div style={{ margin: '1em' }}>
              <input
                type="text"
                placeholder="Enter your code"
                className="code-input"
              ></input>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1em',
              }}
            >
              {' '}
              <button className="apply-btn">Apply</button>
            </div>

            <hr />
            <div className="items-nr">
              Total Cost <div>{(finalQuantity * 7.9).toFixed(2)} $</div>
            </div>

            <Link href="/checkout">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="apply-btn">Checkout</button>
              </div>
            </Link>
          </div>
        </div>{' '}
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
