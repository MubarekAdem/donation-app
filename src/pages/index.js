import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Donation App</title>
        <meta name="description" content="A donation system app" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to the Donation App!</h1>
      </div>
    </>
  );
}
