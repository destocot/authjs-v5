import { z } from "zod";

export const updateUserInfoSchema = z.object({
  name: z.string().min(6).optional(),
});

export type UpdateUserInfo = z.infer<typeof updateUserInfoSchema>;
