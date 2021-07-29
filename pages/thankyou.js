import Head from 'next/head';
import Layout from '../components/Layout';

export default function Thankyou() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Thank you</title>
        </Head>
        <div className="preset-page">
          <div className="thank-you" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="checked.png"></img>
            </div>
            <div
              style={{
                textAlign: 'center',
                fontSize: '3em',
                marginTop: '0.5em',
                marginBottom: '0.5em',
              }}
            >
              THANK YOU!
            </div>
            <div style={{ textAlign: 'center', fontSize: '2em' }}>
              WE'VE SENT THE PRESETS TO YOUR E-MAIL ADDRESS!
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
