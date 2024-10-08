// components/Register.js

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Input } from "antd";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the user data
    const userData = { name, email, password, phone };

    // Send a POST request to register the user
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Handle the response
    if (response.ok) {
      // Optionally redirect to the login page or show a success message
      alert("Registration successful! Please log in.");
      // You can also redirect using the router if desired
      // router.push("/login");
    } else {
      const data = await response.json();
      alert(data.error || "Registration failed!");
    }
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </form>
      <div className="google-signin">
        <Button type="default" onClick={() => signIn("google")}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Register;
