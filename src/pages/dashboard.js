// pages/dashboard.js

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Layout } from "antd";

const { Header, Content, Footer } = Layout;

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to the login page
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Optionally, add a loader
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: "#1890ff", color: "#fff" }}>
        <h1 style={{ color: "#fff" }}>Dashboard</h1>
      </Header>

      <Content style={{ padding: "50px", textAlign: "center" }}>
        {session && (
          <>
            <h2>Welcome, {session.user.name}!</h2>
            <p>Email: {session.user.email}</p>

            <Button type="primary" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        )}
      </Content>

      <Footer style={{ textAlign: "center" }}>Donation App ©2024</Footer>
    </Layout>
  );
}
