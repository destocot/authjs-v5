import { z } from "zod";

export const verifyEmailSchema = z.object({
  token: z.string().cuid2().optional(),
});

export type VerifyEmail = z.infer<typeof verifyEmailSchema>;
