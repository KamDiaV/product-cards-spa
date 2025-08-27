export type Product = {
  id: number
  title: string
  description: string
  image: string
  price: number
  liked: boolean
  createdByUser?: boolean 
}

export type ProductFilter = 'all' | 'favorites' | 'created'
