import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { Product, ProductFilter } from '../types'

export const selectProductsState = (state: RootState) => state.products

export const selectFilter = createSelector(
  [selectProductsState],
  (productsState): ProductFilter => productsState.filter,
)

export const selectSearch = createSelector(
  [selectProductsState],
  (productsState): string => productsState.search,
)

export const selectPage = createSelector(
  [selectProductsState],
  (productsState): number => productsState.page,
)

export const selectPageSize = createSelector(
  [selectProductsState],
  (productsState): number => productsState.pageSize,
)

export const selectFilteredProducts = createSelector(
  [selectProductsState, selectFilter, selectSearch],
  (productsState, filter, search): Product[] => {
    const items = productsState.items
    const trimmedQuery = search.trim().toLowerCase()
    let base = items
    if (filter === 'favorites') base = items.filter(p => p.liked)
    if (filter === 'created') base = items.filter(p => p.createdByUser)
    if (!trimmedQuery) return base
    return base.filter(p =>
      (p.title + ' ' + p.description).toLowerCase().includes(trimmedQuery),
    )
  },
)

export const selectPagination = createSelector(
  [selectFilteredProducts, selectPage, selectPageSize],
  (filtered, page, pageSize) => {
    const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const clampedPage = Math.min(Math.max(1, page), pages)
    return { page: clampedPage, pageSize, pages }
  },
)

export const selectPagedProducts = createSelector(
  [selectFilteredProducts, selectPagination],
  (filtered, pagination): Product[] => {
    const start = (pagination.page - 1) * pagination.pageSize
    return filtered.slice(start, start + pagination.pageSize)
  },
)
