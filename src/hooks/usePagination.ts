import { useMemo } from 'react'

export function usePagination<T>(items: T[], page: number, pageSize: number) {
  const pages = useMemo(() => Math.max(1, Math.ceil(items.length / pageSize)), [items, pageSize])
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, page, pageSize])

  return { pages, paged }
}
