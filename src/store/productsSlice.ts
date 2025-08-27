import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'
import type { Product, ProductFilter } from '../types'

type ProductsState = {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
  filter: ProductFilter
  search: string
  page: number
  pageSize: number
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  filter: 'all',
  search: '',
  page: 1,
  pageSize: 12,
}

type ProductsApiItem = {
  id: number
  title: string
  description: string
  thumbnail: string
  price: number
}
type ProductsApiResponse = { products: ProductsApiItem[] }

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ProductsApiResponse>('/products?limit=100')
      const normalized: Product[] = data.products.map((p: ProductsApiItem) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        image: p.thumbnail,
        price: p.price,
        liked: false,
      }))
      return normalized
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to load'
      return rejectWithValue(errorMessage)
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const p = state.items.find(x => x.id === action.payload)
      if (p) p.liked = !p.liked
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(x => x.id !== action.payload)
    },
    createProduct(state, action: PayloadAction<Omit<Product, 'id' | 'liked'>>) {
      const maxId = state.items.reduce((m, p) => Math.max(m, p.id), 0)
      state.items.unshift({
        ...action.payload,
        id: maxId + 1,
        liked: false,
        createdByUser: true,
      })
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const idx = state.items.findIndex(x => x.id === action.payload.id)
      if (idx >= 0) state.items[idx] = { ...state.items[idx], ...action.payload }
    },
    setFilter(state, action: PayloadAction<ProductsState['filter']>) {
      state.filter = action.payload
      state.page = 1
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = String(action.payload ?? 'Unknown error')
      })
  },
})

export const {
  toggleLike,
  deleteProduct,
  createProduct,
  updateProduct,
  setFilter,
  setSearch,
  setPage,
} = productsSlice.actions

export default productsSlice.reducer
