import Head from "next/head";
import Aside from "@/components/Aside";
import { useEffect } from "react";
import Header from "./HeaderDashboard";

export default function Layout({title,children}:{title: string,children:React.ReactNode}) {

  return (
    < >
      <Head>
        <title>{title}</title>

        <meta name="author" content="Team Sentifix" />
        <meta name="description" content="BTNG Feedback Sentiment Analysis" />
        <meta
          name="keywords"
          content="BTNG, Basic Training Next Generation, Feedback Sentiment Analysis"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />

        {/* Google Font */}
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />
      </Head>
      <Header>
      {children}
        </Header>
    </>
  );
}
