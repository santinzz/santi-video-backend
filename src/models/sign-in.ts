import { z } from 'zod';

export const SignInDtoSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email format',
    }),
  password: z
    .string({
      message: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    }),
});

export type TSignInDto = z.infer<typeof SignInDtoSchema>;
