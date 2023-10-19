import { z } from 'zod';

const UserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    contact_no: z.string().optional(),
    address: z.string().optional(),
  }),
});

export { UserSchema };
