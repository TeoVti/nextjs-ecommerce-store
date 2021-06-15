import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const headerStyles = css`
  color: white;
  padding: 10px 15px;
  background-color: transparent;
  position: fixed;
  width: 100%;
  font-size: 20px;

  span:hover {
    border-bottom: solid #fa2032;
    padding-bottom: 4px;
  }

  span + span {
    margin-left: 70px;
  }
`;

export default function Header(props) {
  const router = useRouter();
  return (
    <header css={headerStyles}>
      <Link href="/">
        <img className="logo" src="/logo.png"></img>
      </Link>

      <div className="nav">
        <span className={router.pathname == '/' ? 'active' : ''}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </span>
        <span className={router.pathname == '/presets' ? 'active' : ''}>
          <Link href="/presets">
            <a>Presets</a>
          </Link>
        </span>
        <span className={router.pathname == '/cart' ? 'active' : ''}>
          <Link href="/cart">
            <a className="cart">
              Cart
              <i className="fa" style={{ fontSize: '24px' }}>
                <img src="/cart.png" className="cart"></img>
              </i>
              <span className="badge badge-warning" id="lblCartCount">
                {props.cartNr}
              </span>
            </a>
          </Link>
        </span>
      </div>
    </header>
  );
}
