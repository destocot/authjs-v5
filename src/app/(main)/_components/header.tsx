import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/actions";

const links = [
  { href: "/auth/signin", text: "Sign In" },
  { href: "/auth/signup", text: "Sign Up" },
];

export const Header = async () => {
  const session = await auth();

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <h1 className="text-4xl font-bold sm:text-5xl">Auth Tutorial</h1>
        <ul className="flex gap-x-4">
          {session?.user ? (
            <>
              <li>
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </li>
              <li>
                <form action={signout}>
                  <Button variant="outline" type="submit">
                    Sign Out
                  </Button>
                </form>
              </li>
            </>
          ) : (
            <>
              {links.map(({ href, text }) => (
                <li key={href}>
                  <Button asChild>
                    <Link href={href}>{text}</Link>
                  </Button>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
