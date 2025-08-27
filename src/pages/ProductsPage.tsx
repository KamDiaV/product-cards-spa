import { useEffect, useState } from 'react'
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
import type { ProductFilter } from '../types'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useDebounce } from '../hooks/useDebounce'
import { selectPagedProducts, selectPagination, selectFilter, selectSearch, selectProductsState } from '../store/productsSelectors'

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectProductsState)
  const filter = useAppSelector(selectFilter)
  const search = useAppSelector(selectSearch)
  const [localSearch, setLocalSearch] = useState<string>(search)
  const debouncedSearch = useDebounce(localSearch, 300)
  const { page, pages } = useAppSelector(selectPagination)
  const paged = useAppSelector(selectPagedProducts)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  useEffect(() => {
    if (debouncedSearch !== search) {
      dispatch(setSearch(debouncedSearch))
    }
  }, [debouncedSearch, search, dispatch])

  if (status === 'loading') return <p>Loading…</p>
  if (status === 'failed') return <p>Failed to load</p>

  return (
    <section>
      <div className="toolbar">
        <Tabs
          value={filter}
          onChange={(v: ProductFilter) => dispatch(setFilter(v))}
          options={[
            { value: 'all', label: 'All' },
            { value: 'favorites', label: 'Favorites' },
          ]}
        />
        <SearchInput
          placeholder="Search products…"
          value={localSearch}
          onChange={setLocalSearch}
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
