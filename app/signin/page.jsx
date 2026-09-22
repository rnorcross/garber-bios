import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import SignInButton from "./SignInButton";

export const dynamic = "force-dynamic";

export default async function SignIn({ searchParams }) {
  if (await getSession()) redirect("/");
  const denied = searchParams?.error === "AccessDenied";
  const failed = searchParams?.error && !denied;
  return (
    <main className="signin">
      <div className="signin-box">
        <img src="/garber-logo-white.png" alt="Garber Automotive Group" />
        <h1>Bios for Dealerships</h1>
        <p>Sign in with your Garber Google account to edit dealership bios.</p>
        {denied && <div className="err">That account isn't on the Garber domain. Sign in with your work Google account.</div>}
        {failed && <div className="err">Sign-in didn't complete. Try again.</div>}
        <SignInButton />
      </div>
    </main>
  );
}
