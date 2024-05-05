"use server";

import { createId } from "@paralleldrive/cuid2";
import { verificationTokens } from "@/drizzle/schema";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { verifyUserEmail } from "@/resources/users/users.actions";

export async function createVerificationToken(email: string) {
  const token = createId();
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  const [newVerificationToken] = await db
    .insert(verificationTokens)
    .values({
      identifier: email,
      token,
      expires,
    })
    .returning({ token: verificationTokens.token });

  return newVerificationToken.token;
}

export async function validateVerificationToken(token: string) {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: (verificationTokens, { eq }) => eq(verificationTokens.token, token),
  });

  if (!verificationToken) {
    return { error: "Invalid token" };
  }

  if (verificationToken.expires < new Date()) {
    deleteVerificationToken(token);
    return { error: "Token expired" };
  }

  deleteVerificationToken(token);
  const success = await verifyUserEmail(verificationToken.identifier);

  return { success, email: verificationToken.identifier };
}

export async function deleteVerificationToken(token: string) {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.token, token));
}

export async function deleteVerificationTokensForUser(email: string) {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.identifier, email));
}
