import { z } from "zod";

export const RecordStatusEnum = z.enum(["publish", "draft", "deleted"]);

export const ItemSchema = z.object({
  id: z.number().nonnegative().optional(),
  name: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  status: RecordStatusEnum,
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemCreateSchema = ItemSchema.pick({
  name: true,
  description: true,
  price: true,
  status: true,
});

export type SuccessPayload = {
    statusCode?: number;
    message?: string;
    payload: {
        [key: string]: any;
    };
};