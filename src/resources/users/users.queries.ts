import "server-only";

import db from "@/lib/db";
import { getAdminAccess } from "../sessions/sessions.queries";

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  return user;
}

export async function getUsers() {
  const isAdmin = await getAdminAccess();
  if (!isAdmin) throw new Error("Unauthorized");

  const users = await db.query.users.findMany({
    columns: { password: false, image: false },
  });

  return users;
}
