import SignInForm from "@/components/Auth/SignInForm";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <SignInForm />
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white p-2 mt-4"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
