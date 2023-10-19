import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    categories: z.string().optional(),
    service_image: z.string().optional(),
    title: z.string(),
    city: z.string(),
    address: z.string(),
    type: z.string(),
    rent: z.number(),
  }),
});

export const updateServiceSchema = z.object({
  categories: z.string().optional(),
  service_image: z.string().optional(),
  title: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  type: z.string().optional(),
  rent: z.string().optional(),
});

export const ServiceZodSchema = {
  createServiceSchema,
  updateServiceSchema,
};
