"use server";
import { users } from "@/drizzle/schema";
import db from "@/lib/db";
import {
  ResetPassword,
  resetPasswordSchema,
  Signin,
  Signup,
  signupSchema,
} from "@/schemas";
import bcrypt from "bcrypt";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { eq } from "drizzle-orm";
import { getAdminAccess, getUserId } from "../sessions/sessions.queries";
import {
  UpdateUserInfo,
  updateUserInfoSchema,
} from "@/schemas/update-user-info";
import {
  createVerificationToken,
  validateVerificationToken,
} from "../verification-tokens/verification-tokens.actions";

export async function createUser(values: Signup) {
  const parsedValues = signupSchema.safeParse(values);

  if (!parsedValues.success) {
    const message = parsedValues.error.errors[0].message;
    return { error: message };
  }

  const { email, name, password } = parsedValues.data;

  const userExists = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (userExists) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [user] = await db
      .insert(users)
      .values({ email, name, password: hashedPassword })
      .returning({ email: users.email });

    await createVerificationToken(user.email);
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "Something went wrong" };
  }
}

export async function signinUser(values: Signin) {
  try {
    await signIn("credentials", {
      ...values,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "AccessDenied":
          return { error: "Please verify your email", status: 403 };
        default:
          return { error: "Something went wrong" };
      }
    }
    if (isRedirectError(err)) {
      throw err;
    }
  }
}

export async function verifyUserEmail(email: string) {
  const res = await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, email));

  return res.changes === 1;
}

export async function updateUserInfo(values: UpdateUserInfo) {
  const parsedValues = updateUserInfoSchema.safeParse(values);

  if (!parsedValues.success) {
    const message = parsedValues.error.errors[0].message;
    return { error: message, data: null };
  }

  const { data } = parsedValues;

  const userId = await getUserId();
  if (!userId) return { error: "Unauthorized", data: null };

  const newUserInfo: UpdateUserInfo = {};

  if (data.name) {
    newUserInfo.name = data.name;
  }

  if (Object.keys(newUserInfo).length === 0) {
    return { error: "Invalid data", data: null };
  }

  const [updatedUser] = await db
    .update(users)
    .set(newUserInfo)
    .where(eq(users.id, userId))
    .returning({ name: users.name });

  return { data: updatedUser, error: null };
}

export async function resetUserPassword(values: ResetPassword, token: string) {
  const parsedValues = resetPasswordSchema.safeParse(values);

  if (!parsedValues.success) {
    const message = parsedValues.error.errors[0].message;
    return { error: message, data: null };
  }

  const res = await validateVerificationToken(token);

  if (res.error) {
    return { error: res.error, data: null };
  }

  if (!res.success) {
    return { error: "Something went wrong. Please try again.", data: null };
  }

  const { email } = res;

  const hashedPassword = await bcrypt.hash(parsedValues.data.password, 10);

  const data = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email));

  return { data, error: null };
}
