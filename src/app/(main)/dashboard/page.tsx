import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ListUsers,
  UpdateUserInfoDialog,
} from "@/app/(main)/dashboard/_components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return (
    <main>
      <div className="space-y-6 px-3">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold">Dashboard</h2>
          <div className="relative space-y-2 p-5 shadow">
            <MainCard name={session.user.name!} image={session.user.image!} />
            <hr className="my-4 opacity-50" />
            <MiniCard label="Email" value={session.user.email!} />
            <MiniCard label="Role" value={session.user.role!} />
            <div className="absolute right-2 top-2">
              <UpdateUserInfoDialog name={session.user.name!} />
            </div>
          </div>
        </div>
        {session.user.role === "admin" && (
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold">Users List</h2>
            <ListUsers />
          </div>
        )}
      </div>
    </main>
  );
}

type MiniCardProps = { label: string; value: string };

function MiniCard({ label, value }: MiniCardProps) {
  return (
    <p className="flex items-center gap-x-2">
      <span className="w-[7ch] font-semibold">{label}:</span>
      <span className="rounded bg-primary px-2.5 py-0.5 text-primary-foreground">
        {value}
      </span>
    </p>
  );
}

type MainCard = { name: string; image: string };

function MainCard({ name, image }: MainCard) {
  return (
    <div className="flex items-center gap-x-2">
      <p className="text-xl font-semibold">{name}</p>
      <Avatar className="h-12 w-12">
        <AvatarImage src={image ?? undefined} />
        <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
