
import Head from "next/head";
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { UserProvider } from "../../context/page.js";
export default function RootLayout({ children, title }) {
  return (
    <>
      <html>
        <UserProvider>

          <Head>

            <meta charSet="UTF-8" name="viewport" content="initial-scale=1.0 width=device-width" />
            <title>{title}</title>

          </Head>
          <body>
            <Header />
            <main style={{ minHeight: "79.7vh", backgroundColor: "wheat" }}>{children}</main>
            <Footer />
          </body>
        </UserProvider>
      </html>
    </>
  );
}

RootLayout.defaultProps = {
  title: "Social Media App",
};