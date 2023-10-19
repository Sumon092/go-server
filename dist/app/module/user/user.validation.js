"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingCreateSchema = void 0;
const zod_1 = require("zod");
const BookingCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        isConfirmed: zod_1.z.boolean().default(false),
        requestBooking: zod_1.z.boolean(),
        isCancel: zod_1.z.boolean().default(false),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        serviceId: zod_1.z.string(),
    }),
});
exports.BookingCreateSchema = BookingCreateSchema;
