import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // Redirect to items page after successful sign-in
      router.push("/items");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/items" });
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
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white p-2"
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default SignInForm;
