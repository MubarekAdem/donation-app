import SignUpForm from "../components/Auth/SignUpForm";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <SignUpForm />
        <button
          onClick={() => signIn("google", { callbackUrl: "/items" })}
          className="bg-red-500 text-white p-2 mt-4"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}
