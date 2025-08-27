import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../store/productsSlice'
import ProductForm from '../ui/ProductForm'
import type { ProductFormValues } from '../validation/productSchema'
import Toast from '../ui/Toast'

export default function CreateProductPage() {
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const [showToast, setShowToast] = useState(false)

  const defaults: ProductFormValues = {
    title: '',
    description: '',
    image: '',
    price: 0,
  }

  const onSubmit = (data: ProductFormValues) => {
    dispatch(createProduct(data))
    setShowToast(true)
  }

  return (
    <>
      <ProductForm defaultValues={defaults} onSubmit={onSubmit} submitLabel="Create" />
      <div className="form__footer">
        <button type="button" className="link-btn" onClick={() => nav('/products')}>
          Back to products
        </button>
      </div>
      {showToast && (
        <Toast
          message="Product created successfully!"
          onClose={() => { setShowToast(false); nav('/products', { replace: true }) }}
        />
      )}
    </>
  )
}
