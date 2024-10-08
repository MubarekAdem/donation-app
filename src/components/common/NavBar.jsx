// components/Navbar.js
import { useSession, signOut } from "next-auth/react";
import { Layout, Button } from "antd";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1890ff",
      }}
    >
      <div style={{ color: "#fff", fontSize: "20px" }}>Donation App</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {session && (
          <>
            <span style={{ color: "#fff", marginRight: "10px" }}>
              {session.user.name}
            </span>
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
            ) : (
              <UserOutlined
                style={{ fontSize: "40px", color: "#fff", marginRight: "10px" }}
              />
            )}
            {session.user.role === "admin" && (
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => router.push("/dashboard/user-manage")}
              >
                Users List
              </Button>
            )}
            <Button
              type="link"
              style={{ color: "#fff" }}
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
