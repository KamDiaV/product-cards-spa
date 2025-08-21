import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import {
  fetchProducts,
  setFilter,
  setSearch,
  setPage,
} from '../store/productsSlice'
import ProductCard from '../ui/ProductCard'
import SearchInput from '../ui/SearchInput'
import Tabs from '../ui/Tabs'
import Pagination from '../ui/Pagination'

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, status, filter, search, page, pageSize } = useSelector(
    (s: RootState) => s.products,
  )

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const filtered = useMemo(() => {
    const byFav = filter === 'favorites' ? items.filter(i => i.liked) : items
    const bySearch = search
      ? byFav.filter(i =>
          (i.title + ' ' + i.description).toLowerCase().includes(search.toLowerCase()),
        )
      : byFav
    return bySearch
  }, [items, filter, search])

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const start = (page - 1) * pageSize
  const paged = filtered.slice(start, start + pageSize)

  if (status === 'loading') return <p>Loading…</p>
  if (status === 'failed') return <p>Failed to load</p>

  return (
    <section>
      <div className="toolbar">
        <Tabs
          value={filter}
          onChange={(v) => dispatch(setFilter(v as 'all' | 'favorites'))}
          options={[
            { value: 'all', label: 'All' },
            { value: 'favorites', label: 'Favorites' },
          ]}
        />
        <SearchInput
          placeholder="Search products…"
          value={search}
          onChange={(v) => dispatch(setSearch(v))}
        />
      </div>

      <div className="grid">
        {paged.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Pagination
        page={page}
        pages={pages}
        onChange={(p) => dispatch(setPage(p))}
      />
    </section>
  )
}