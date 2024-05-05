"use server";
import { signIn, signOut } from "@/auth";

export async function signinWithOath(provider: "google" | "github") {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function signout() {
  await signOut({ redirectTo: "/auth/signin" });
}
