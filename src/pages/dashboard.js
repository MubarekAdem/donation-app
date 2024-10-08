import { useState } from "react";
import { Layout, Button, Card, Modal } from "antd";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import FoodDetail from "@/components/user/FoodDetail"; // Import the FoodDetail component
import NavBar from "@/components/common/NavBar";

const { Header, Content, Footer } = Layout;

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardClick = (item) => {
    if (item === "food") {
      setIsModalVisible(true); // Show the FoodDetail modal
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "#1890ff", color: "#fff" }}>
        <NavBar />
        <h1 style={{ color: "#fff" }}>Dashboard</h1>
      </Header>

      <Content style={{ padding: "50px", textAlign: "center" }}>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            {session ? ( // Check if session exists
              <>
                <h2>Welcome, {session.user.name}!</h2>
                <p>Email: {session.user.email}</p>
              </>
            ) : (
              <h2>Please log in to access your dashboard.</h2> // Message for logged-out users
            )}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Card
                title="Food"
                onClick={() => handleCardClick("food")}
                style={{ width: 300, cursor: "pointer", transition: "0.3s" }}
                hoverable
              >
                <p>Click here to donate food items.</p>
              </Card>
              <Card
                title="Home Material"
                onClick={() => handleCardClick("home")}
                style={{ width: 300, cursor: "pointer", transition: "0.3s" }}
                hoverable
              >
                <p>Click here to donate home materials.</p>
              </Card>
              <Card
                title="Clothes"
                onClick={() => handleCardClick("clothes")}
                style={{ width: 300, cursor: "pointer", transition: "0.3s" }}
                hoverable
              >
                <p>Click here to donate clothes.</p>
              </Card>
              <Card
                title="Donate Money"
                onClick={() => handleCardClick("money")}
                style={{ width: 300, cursor: "pointer", transition: "0.3s" }}
                hoverable
              >
                <p>Click here to donate money.</p>
              </Card>
            </div>

            <Modal
              title="Food Details"
              visible={isModalVisible}
              footer={null}
              onCancel={handleCloseModal}
            >
              <FoodDetail onClose={handleCloseModal} />
            </Modal>
          </>
        )}
      </Content>

      <Footer style={{ textAlign: "center" }}>Donation App ©2024</Footer>
    </Layout>
  );
}
