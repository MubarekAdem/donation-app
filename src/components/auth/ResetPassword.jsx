// components/Auth/ResetPassword.js
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query; // Get the token from the URL
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (values) => {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: values.newPassword }),
    });
    const data = await response.json();
    alert(data.message);
    if (data.message === "Password successfully reset") {
      router.push("/login");
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <h2>Reset Password</h2>
      <Form.Item
        name="newPassword"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Reset Password
      </Button>
    </Form>
  );
};

export default ResetPassword;
