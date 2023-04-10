import Head from "next/head";
import Settings from "@/components/Settings";
import List from "@/components/List";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cryptograze</title>
        <meta name="description" content="Top 100 Cryptocurrencies Viewer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-container">
        <header className="title-setting-container">
          <h1>Cryptograze</h1>
          <Settings />
        </header>
        <List />
      </main>
    </>
  );
}
