import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { authConfig } from "@/auth.config";
import { signinSchema } from "@/schemas";
import db from "@/lib/db";
import * as schema from "@/drizzle/schema";
import { getUserByEmail } from "@/resources/users/users.queries";
import { verifyUserEmail } from "@/resources/users/users.actions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: {
    ...DrizzleAdapter(db, {
      accountsTable: schema.accounts,
      sessionsTable: schema.sessions,
      usersTable: schema.users,
      verificationTokensTable: schema.verificationTokens,
    }),
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = signinSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user) return null;

          /* Check if user is an OAuth user */
          if (!user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      if (user.email) {
        await verifyUserEmail(user.email);
      }
    },
  },
} satisfies NextAuthConfig);
