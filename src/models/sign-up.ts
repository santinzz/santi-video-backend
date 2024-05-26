import { z } from 'zod';

export const SignUpDtoSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  username: z
    .string({
      message: 'Username is required',
    })
    .min(4, {
      message: 'Username must be at least 4 characters long',
    }),
  password: z
    .string({
      message: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(32, {
      message: 'Password must be at most 32 characters long',
    }),
});

export type TSignUpDto = z.infer<typeof SignUpDtoSchema>;
