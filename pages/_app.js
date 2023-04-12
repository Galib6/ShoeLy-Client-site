import "@/styles/globals.css";
import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>Shoe.Ly</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cart.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Helmet>
        <script
          src="//code.tidio.co/ywzsy9lxhnx2aerwnzyepsrcljj9x7yq.js"
          async
        ></script>
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header />
          <ToastContainer />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
