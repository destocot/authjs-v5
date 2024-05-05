import { z } from "zod";

export const newVerificationTokenSchema = z.object({
  email: z.string().email(),
});

export type NewVerificationToken = z.infer<typeof newVerificationTokenSchema>;
