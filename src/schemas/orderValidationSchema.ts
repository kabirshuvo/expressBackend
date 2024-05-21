// src/schemas/orderValidationSchema.ts
import { z } from 'zod';

export const createOrderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});
