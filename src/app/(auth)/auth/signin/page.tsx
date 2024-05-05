import { Button } from "@/components/ui/button";
import {
  GoogleSigninBtn,
  SigninForm,
  GithubSigninBtn,
  NewVerificationTokenDialog,
} from "@/app/(auth)/_components";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};
export default function Page() {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="space-y-2">
        <h2 className="text-center text-4xl font-bold">Sign In</h2>
        <div className="w-96 rounded p-2 shadow">
          <SigninForm />
          <hr className="my-2 opacity-50" />
          <NewVerificationTokenDialog />
          <hr className="my-2 opacity-50" />
          <div className="space-y-2">
            <GoogleSigninBtn />
            <GithubSigninBtn />
          </div>
        </div>
        <p className="text-center text-sm opacity-80">
          Don&apos;t have an account? Sign-up{" "}
          <Button variant="link" asChild className="p-0 text-inherit">
            <Link href="/auth/signup">here</Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
