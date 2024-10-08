// pages/_app.js
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css"; // Adjust this path to point to the correct location of globals.css

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
