import { Header, Footer } from "@/app/(main)/_components";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow py-5">{children}</div>
      <Footer />
    </div>
  );
}
