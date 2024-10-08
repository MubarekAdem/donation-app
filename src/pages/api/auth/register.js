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
    // Handle registration logic here (e.g., API call to register the user)
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
