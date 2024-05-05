import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen">
      <div className="flex-1">{children}</div>
      <div className="hidden flex-1 bg-primary lg:block" />
      <HomeButton />
    </div>
  );
}

const HomeButton = () => (
  <Button size="icon" className="absolute left-2 top-2" asChild>
    <Link href="/">
      <HomeIcon size={24} />
    </Link>
  </Button>
);
