import { z } from 'zod';

export const createProductValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  tags: z
    .array(z.string().min(1, 'Tag is required'))
    .nonempty('At least one tag is required'),
  variants: z
    .array(
      z.object({
        type: z.string().min(1, 'Variant type is required'),
        value: z.string().min(1, 'Variant value is required'),
      }),
    )
    .nonempty('At least one variant is required'),
  inventory: z.object({
    quantity: z.number().int().min(0, 'Quantity must be zero or more'),
    inStock: z.boolean(),
  }),
});
