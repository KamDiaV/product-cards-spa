import axios from 'axios'
import { z } from 'zod'
import type { Product } from './types'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

const ProductApiItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().url(),
  price: z.number(),
})

const ProductsApiResponseSchema = z.object({
  products: z.array(ProductApiItemSchema),
})

function mapApiItemToProduct(item: z.infer<typeof ProductApiItemSchema>): Product {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.thumbnail,
    price: item.price,
    liked: false,
  }
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get('/products?limit=100')
  const parsed = ProductsApiResponseSchema.parse(data)
  return parsed.products.map(mapApiItemToProduct)
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`)
  const parsed = ProductApiItemSchema.parse(data)
  return mapApiItemToProduct(parsed)
}
