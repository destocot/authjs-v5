import { Button } from "@/components/ui/button";
import {
  GithubSigninBtn,
  GoogleSigninBtn,
  SignupForm,
} from "@/app/(auth)/_components";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};
export default function Page() {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="space-y-2">
        <h2 className="text-center text-4xl font-bold">Sign Up</h2>
        <div className="w-96 rounded p-2 shadow">
          <SignupForm />
          <hr className="my-2 opacity-50" />
          <div className="space-y-2">
            <GoogleSigninBtn signup />
            <GithubSigninBtn signup />
          </div>
        </div>
        <p className="text-center text-sm opacity-80">
          Already have an account? Sign-in{" "}
          <Button variant="link" className="p-0 text-inherit" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
