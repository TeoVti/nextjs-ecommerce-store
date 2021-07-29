import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Layout from '../components/Layout';

const pageContainer = css`
  display: flex;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  align-items: center;
  justify-content: center;
`;

const customerInfoDataContainer = css`
  display: flex;
  width: 50vw;
  margin-left: 20px;
  margin-right: 20px;
  height: 95%;
  border: solid 2px gray;
  border-radius: 8px;
  padding-bottom: 20px;
  background-color: #150808;
`;

const rightContainer = css`
  display: flex;
  margin-top: 10px;
  width: 50vw;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: column;
  height: 95%;
  h1 {
    margin-bottom: 20px;
  }
  Form.Control {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
`;

const totalSumContainer = css`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  align-self: flex-start;
  height: 40vh;
  border: solid 2px gray;
  border-radius: 8px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: #150808;
  h1 {
    display: flex;
    font-size: 28px;
    font-weight: 900;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  div {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  .total-sum {
    font-weight: 900;
    font-size: 20px;
  }
`;

const totalSumCalculation = css`
  flex-direction: column;
  display: flex;
`;

const leftContainer = css`
  display: flex;
  margin-top: 10px;
  width: 50vw;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: column;
  height: 95%;
  h1 {
    margin-bottom: 20px;
  }
`;

const iconContainer = css`
  img {
    width: 50px;
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const inputStyles = css`
  margin-bottom: 5px;
  margin-top: 5px;
`;

export default function Checkout(props) {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const {
      fullName,
      email,
      address,
      city,
      zip,
      state,
      cardnumber,
      cardname,
      expMonth,
      expYear,
      cvv,
    } = form;
    const newErrors = {};
    // name errors
    if (!fullName || fullName === '') {
      newErrors.fullName = 'Please enter your full name!';
    } else if (fullName.length > 40) {
      newErrors.fullName = 'Your name is too long!';
    }

    // card number errors
    if (!cardnumber || cardnumber === '') {
      newErrors.cardnumber = 'Please enter your card number!';
    } else if (cardnumber.length > 16 || cardnumber.length < 16) {
      newErrors.cardnumber = 'Please enter a valid card number!';
    }

    // state errors
    if (!state || state === '') {
      newErrors.state = 'Please enter a state!';
    }

    // email errors
    if (!email || email === '') {
      newErrors.email = 'Please enter your email!';
    }
    // address errors
    if (!address || address === '') {
      newErrors.address = 'Please enter your address!';
    } else if (address.length > 100) {
      newErrors.address = 'Your address is too long!';
    }
    // zip code errors
    if (!zip || zip.length > 5 || zip.length < 5) {
      newErrors.zip = 'Please enter a valid ZIP Code!';
    }
    // city errors
    if (!city || city === '') {
      newErrors.city = 'Please enter a city!';
    }

    // card number errors
    if (!cardnumber || cardnumber.length !== 16) {
      newErrors.cardnumber = 'Please enter a valid credit card number!';
    }

    // expiration month error
    if (!expMonth || expMonth === '') {
      newErrors.expMonth = 'Please enter an expiration month';
    }

    // cardname error
    if (!cardname || cardname === '') {
      newErrors.cardname = 'Please enter your card name';
    }

    // expiration year error
    if (!expYear || expYear === '') {
      newErrors.country = 'Please enter an expiration year';
    } else if (expYear.length > 4 || expYear.length < 4) {
      newErrors.address = 'Please enter a valid expiration year!';
    }

    // cvv error
    if (!cvv || cvv === '') {
      newErrors.cvv = 'Please enter your cvv!';
    } else if (cvv.length > 3 || cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid cvv!';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    console.log(newErrors);
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      // alert('Your payment went through!');
      router.push('/thankyou/');
    }
  };
  return (
    <div>
      <Layout
        cartNr={props.testCookie
          .map((i) => i.quantity)
          .reduce((a, b) => a + b, 0)}
      >
        <Head>
          <title>Checkout</title>
        </Head>
        <div className="cart-page">
          <section css={pageContainer}>
            <Form>
              <div css={customerInfoDataContainer}>
                <div css={leftContainer}>
                  <h1>Shipping address</h1>
                  <Form.Group>
                    <Form.Label css={inputStyles}>Full Name</Form.Label>
                    <Form.Control
                      data-cy="full-name"
                      onChange={(e) => setField('fullName', e.target.value)}
                      type="text"
                      id="fname"
                      placeholder="John M. Doe"
                      isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label css={inputStyles}>Email</Form.Label>
                    <Form.Control
                      data-cy="email"
                      onChange={(e) => setField('email', e.target.value)}
                      type="text"
                      id="email"
                      placeholder="john@example.com"
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label css={inputStyles}>Address</Form.Label>
                    <Form.Control
                      data-cy="address"
                      onChange={(e) => setField('address', e.target.value)}
                      type="text"
                      id="adr"
                      placeholder="542 W. 15th Street"
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label css={inputStyles}>City</Form.Label>
                    <Form.Control
                      data-cy="city"
                      type="text"
                      id="city"
                      placeholder="New York"
                      onChange={(e) => setField('city', e.target.value)}
                      isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label css={inputStyles}>State</Form.Label>
                    <Form.Control
                      data-cy="state"
                      type="text"
                      id="state"
                      placeholder="NY"
                      onChange={(e) => setField('state', e.target.value)}
                      isInvalid={!!errors.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label css={inputStyles}>Zip</Form.Label>
                    <Form.Control
                      data-cy="zip"
                      type="text"
                      id="zip"
                      placeholder="10001"
                      onChange={(e) => setField('zip', e.target.value)}
                      isInvalid={!!errors.zip}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zip}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div css={rightContainer}>
                  <h1>Payment</h1>
                  <div style={{ marginTop: '0.4em' }}>Accepted Cards</div>
                  <div css={iconContainer}>
                    <img src="/visa.png" alt="" />
                    <img src="/americanexpress.png" alt="" />
                    <img src="/mastercard.png" alt="" />
                    <img src="/paypal.png" alt="" />
                  </div>

                  <Form.Group>
                    <Form.Label css={inputStyles}>Name on Card</Form.Label>
                    <Form.Control
                      data-cy="cname"
                      type="text"
                      id="cname"
                      placeholder="John More Doe"
                      onChange={(e) => setField('cardname', e.target.value)}
                      isInvalid={!!errors.cardname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cardname}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label css={inputStyles}>
                      Credit card number
                    </Form.Label>
                    <Form.Control
                      data-cy="ccnum"
                      type="text"
                      id="ccnum"
                      placeholder="1111-2222-3333-4444"
                      onChange={(e) => setField('cardnumber', e.target.value)}
                      isInvalid={!!errors.cardnumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cardnumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label css={inputStyles}>Exp Month</Form.Label>
                    <Form.Control
                      data-cy="expmonth"
                      type="text"
                      id="expmonth"
                      placeholder="September"
                      onChange={(e) => setField('expMonth', e.target.value)}
                      isInvalid={!!errors.expMonth}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.expMonth}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label css={inputStyles}>Exp Year</Form.Label>
                    <Form.Control
                      data-cy="expyear"
                      type="text"
                      id="expyear"
                      placeholder="2018"
                      onChange={(e) => setField('expYear', e.target.value)}
                      isInvalid={!!errors.expYear}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.expYear}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label css={inputStyles}>CVV</Form.Label>
                    <Form.Control
                      data-cy="cvv"
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="352"
                      onChange={(e) => setField('cvv', e.target.value)}
                      isInvalid={!!errors.cvv}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cvv}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </Form>

            {/* Start of total sum container */}
            <div css={totalSumContainer}>
              <h1>Order Summary</h1>

              <div css={totalSumCalculation}>
                <div className="total-sum">
                  Total:{' '}
                  {props.testCookie
                    .map((i) => i.quantity)
                    .reduce((a, b) => a + b, 0) * 7.9}{' '}
                  €
                </div>
              </div>

              <button
                data-cy="pay-button"
                type="submit"
                className="presets-btn"
                onClick={(e) => handleSubmit(e)}
              >
                Pay now
              </button>
            </div>
          </section>
        </div>
      </Layout>
    </div>
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
