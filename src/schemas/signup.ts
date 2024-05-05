import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

export type Signup = z.infer<typeof signupSchema>;
