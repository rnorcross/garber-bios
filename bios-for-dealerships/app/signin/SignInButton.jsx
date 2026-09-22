"use client";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button className="btn btn-cta" type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
      Sign in with Google
    </button>
  );
}
