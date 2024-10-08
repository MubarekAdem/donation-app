// components/Auth/Register.js
import { useState } from "react";
import { Button, Form, Input } from "antd";

const Register = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = async (values) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        phone,
      }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <Form onFinish={handleSubmit}>
      <h2>Register</h2>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item name="phone">
        <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
