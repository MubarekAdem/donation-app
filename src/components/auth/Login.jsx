// src/components/Auth/Login.js
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (values) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result.error) {
      alert("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { redirect: false });
    router.push("/dashboard");
  };

  return (
    <Form onFinish={handleSubmit}>
      <h2>Login</h2>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
      <Button type="link" onClick={handleGoogleSignIn}>
        Login with Google
      </Button>
      <br />
      <p href="/forgot-password">Forgot Password?</p>
    </Form>
  );
};

export default Login;
