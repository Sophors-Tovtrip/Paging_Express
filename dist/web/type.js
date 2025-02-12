"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCreateSchema = exports.ItemSchema = exports.RecordStatusEnum = void 0;
const zod_1 = require("zod");
exports.RecordStatusEnum = zod_1.z.enum(["publish", "draft", "deleted"]);
exports.ItemSchema = zod_1.z.object({
    id: zod_1.z.number().nonnegative().optional(),
    name: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0, "Price must be greater than or equal to 0"),
    status: exports.RecordStatusEnum,
});
exports.ItemCreateSchema = exports.ItemSchema.pick({
    name: true,
    description: true,
    price: true,
    status: true,
});
