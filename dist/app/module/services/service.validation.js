"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceZodSchema = exports.updateServiceSchema = exports.createServiceSchema = void 0;
const zod_1 = require("zod");
exports.createServiceSchema = zod_1.z.object({
    categories: zod_1.z.string().optional(),
    service_image: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    city: zod_1.z.string(),
    address: zod_1.z.string(),
    type: zod_1.z.string(),
    rent: zod_1.z.number(),
});
exports.updateServiceSchema = zod_1.z.object({
    categories: zod_1.z.string().optional(),
    service_image: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    rent: zod_1.z.string().optional(),
});
exports.ServiceZodSchema = {
    createServiceSchema: exports.createServiceSchema,
    updateServiceSchema: exports.updateServiceSchema,
};
