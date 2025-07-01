import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("User name is required")
    .min(3, "User name must be at least 3 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
