// components/FoodDetail.js
import { useState } from "react";
import { Button, Input, message } from "antd";
import { useSession } from "next-auth/react";

const FoodDetail = ({ onClose }) => {
  const { data: session } = useSession();
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          message.success("Location retrieved successfully!");
        },
        () => {
          message.error("Unable to retrieve location.");
        }
      );
    } else {
      message.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async () => {
    if (!description || !phoneNumber || !location) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id, // Ensure this is correct based on your user data structure
          userName: session.user.name, // Add user name here
          description,
          phoneNumber,
          location,
        }),
      });

      if (response.ok) {
        message.success("Food details submitted successfully!");
        onClose(); // Close the modal or component
      } else {
        throw new Error("Failed to submit food details");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <h2>Food Details</h2>
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      <Button
        type="primary"
        onClick={handleLocationClick}
        style={{ marginTop: "10px" }}
      >
        Get Location
      </Button>
      {location && (
        <div>
          <p>
            Location: {location.latitude}, {location.longitude}
          </p>
        </div>
      )}
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: "10px" }}
      >
        Submit
      </Button>
      <Button onClick={onClose} style={{ marginTop: "10px" }}>
        Close
      </Button>
    </div>
  );
};

export default FoodDetail;
