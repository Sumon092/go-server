import { z } from 'zod';

const BookingCreateSchema = z.object({
  body: z.object({
    isConfirmed: z.boolean().default(false),
    requestBooking: z.boolean(),
    isCancel: z.boolean().default(false),
    startDate: z.string(),
    endDate: z.string(),
    serviceId: z.string(),
  }),
});

export { BookingCreateSchema };
