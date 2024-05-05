import Link from "next/link";
import { verifyEmailSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { ResetPasswordForm } from "@/app/(auth)/_components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
  const parsedSearchParams = verifyEmailSchema.parse(searchParams);

  const { token } = parsedSearchParams;

  return (
    <main className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-center text-4xl font-bold">
          Create a new password
        </h2>
        <div className="w-96 space-y-2 rounded p-2 shadow">
          {!token && (
            <p className="text-center text-sm opacity-80">
              Invalid token. Please check your email for the correct link.
            </p>
          )}
          {token && <ResetPasswordForm token={token} />}
          {/* <div className="flex justify-end">
            <NewVerificationTokenDialog />
          </div> */}
        </div>
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
