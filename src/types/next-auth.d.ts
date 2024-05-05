import { RoleEnum } from "@/drizzle/schema";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: RoleEnum;
    emailVerified: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: RoleEnum;
  }
}
