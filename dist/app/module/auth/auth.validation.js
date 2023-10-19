"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        contact_no: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.UserSchema = UserSchema;
