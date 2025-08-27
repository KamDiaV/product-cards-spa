import { useMemo } from 'react'
import type { Product, ProductFilter } from '../types'

export function useFilteredProducts(
  products: Product[],
  filter: ProductFilter,
  search: string,
): Product[] {
  return useMemo(() => {
    const byFavorite = filter === 'favorites' ? products.filter(p => p.liked) : products
    if (!search) return byFavorite
    const normalizedQuery = search.toLowerCase()
    return byFavorite.filter(p =>
      (p.title + ' ' + p.description).toLowerCase().includes(normalizedQuery),
    )
  }, [products, filter, search])
}
