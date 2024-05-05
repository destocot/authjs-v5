import "server-only";

import { auth } from "@/auth";

export async function getAdminAccess() {
  const session = await auth();

  if (!session?.user) return false;

  const { role } = session.user;

  if (role !== "admin") return false;

  return true;
}

export async function getUserId() {
  const session = await auth();

  if (!session?.user) return null;

  return session.user.id;
}
