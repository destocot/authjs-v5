import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="w-96 space-y-2 rounded p-2 shadow">
        <div className="space-y-1 py-2 text-center">
          <CheckCircleIcon size={48} className="mx-auto" />
          <h3 className="text-3xl font-semibold">
            Password successfully reset
          </h3>
          <Link href="/auth/signin" className="block">
            Click <span className="font-semibold">here</span> to sign in.
          </Link>
        </div>
      </div>
    </main>
  );
}
