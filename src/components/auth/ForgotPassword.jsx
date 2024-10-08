// components/Auth/ForgotPassword.js
import { useState } from "react";
import { Button, Form, Input } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (values) => {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <Form onFinish={handleSubmit}>
      <h2>Forgot Password</h2>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Send Reset Link
      </Button>
    </Form>
  );
};

export default ForgotPassword;
