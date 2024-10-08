// pages/_app.js

import "../styles/globals.css"; // Adjust this path to point to the correct location of globals.css

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
