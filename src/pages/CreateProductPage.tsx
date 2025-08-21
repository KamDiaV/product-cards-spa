import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../store/productsSlice'
import ProductForm from '../ui/ProductForm'
import type { ProductFormValues } from '../validation/productSchema'

export default function CreateProductPage() {
  const dispatch = useDispatch()
  const nav = useNavigate()

  const defaults: ProductFormValues = {
    title: '',
    description: '',
    image: '',
    price: 0,
  }

  const onSubmit = (data: ProductFormValues) => {
    dispatch(createProduct(data))
    nav('/products')
  }

  return <ProductForm defaultValues={defaults} onSubmit={onSubmit} submitLabel="Create" />
}