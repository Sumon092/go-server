"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewZodSchema = exports.create = void 0;
const zod_1 = require("zod");
exports.create = zod_1.z.object({
    review: zod_1.z.string().optional(),
    ratings: zod_1.z.number().optional(),
});
exports.ReviewZodSchema = {
    create: exports.create,
};
