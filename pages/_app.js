// pages/_app.js
import '../public/styles.css'; // Import your global CSS file

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
