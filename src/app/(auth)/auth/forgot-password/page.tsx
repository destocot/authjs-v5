import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ForgotPasswordForm } from "../../_components/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};
export default function Page() {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="space-y-4">
        <h2 className="text-center text-4xl font-bold">Forgot Password?</h2>
        <p className="text-center text-sm opacity-80">
          No worries! Fill out the form below.
        </p>
        <ForgotPasswordForm />
        <p className="text-center text-sm opacity-80">
          Remembered your password? Sign-in{" "}
          <Button variant="link" className="p-0 text-inherit" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
