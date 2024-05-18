"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const zod_1 = require("zod");
exports.Register = zod_1.z
    .object({
    username: zod_1.z
        .string({ message: 'Username is required' })
        .min(5, { message: 'Must be 5 or more characters long' }),
    email: zod_1.z
        .string({ message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: zod_1.z
        .string({ message: 'Password is required' })
        .min(5, { message: 'Must be 5 or more characters long' }),
})
    .strict();
exports.Login = zod_1.z.object({
    email: zod_1.z
        .string({ message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: zod_1.z
        .string({ message: 'Password is required' })
        .min(5, { message: 'Must be 5 or more characters long' }),
});
