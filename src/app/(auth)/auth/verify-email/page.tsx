import Link from "next/link";
import { verifyEmailSchema } from "@/schemas";
import {
  VerifyEmailCard,
  NewVerificationTokenDialog,
} from "@/app/(auth)/_components";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
  const parsedSearchParams = verifyEmailSchema.parse(searchParams);

  const { token } = parsedSearchParams;

  return (
    <main className="flex h-full items-center justify-center">
      <div className="space-y-4">
        <h2 className="text-center text-4xl font-bold">Verifying email...</h2>
        <div className="w-96 space-y-2 rounded p-2 shadow">
          {!token && (
            <p className="text-center text-sm opacity-80">
              Invalid token. Please check your email for the correct link.
            </p>
          )}
          {token && <VerifyEmailCard token={token} />}
          <div className="flex justify-end">
            <NewVerificationTokenDialog />
          </div>
        </div>
        <p className="text-center text-sm opacity-80">
          Already verified? Sign-in{" "}
          <Button variant="link" className="p-0 text-inherit" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
