import { z } from 'zod';

export const create = z.object({
  review: z.string().optional(),
  ratings: z.number().optional(),
});

export const ReviewZodSchema = {
  create,
};
