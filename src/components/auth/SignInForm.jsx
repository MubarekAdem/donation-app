import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (!res?.error) {
      router.push("/items"); // Redirect to items page after successful sign-in
    } else {
      alert("Error logging in");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
