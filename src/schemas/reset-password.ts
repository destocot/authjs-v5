import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => {
    return data.password === data.confirmPassword;
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
