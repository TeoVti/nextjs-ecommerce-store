import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Header cartNr={props.cartNr} />
      {props.children}
      <Footer />
    </>
  );
}
