import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Image must be a valid URL'),
  price: z.number().min(0.01, 'Price must be > 0'),
})

export type ProductFormValues = z.infer<typeof productSchema>