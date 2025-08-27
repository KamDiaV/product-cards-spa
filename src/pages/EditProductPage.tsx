import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProductById, updateProduct } from '../store/productsSlice'
import type { ProductFormValues } from '../validation/productSchema'
import ProductForm from '../ui/ProductForm'
import Toast from '../ui/Toast'

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, status, error } = useAppSelector(s => s.products)
  const product = items.find(p => String(p.id) === String(id))
  const [showToast, setShowToast] = useState(false)
  const requestedIdRef = useRef<number | null>(null)
  const numericId = id ? Number(id) : NaN

  useEffect(() => {
    if (!Number.isNaN(numericId) && !product && requestedIdRef.current !== numericId) {
      requestedIdRef.current = numericId
      dispatch(fetchProductById(numericId))
    }
    if (product && requestedIdRef.current === numericId) {
      requestedIdRef.current = null
    }
  }, [numericId, product, dispatch])

  if (
    (!product && (status === 'idle' || status === 'loading')) ||
    (!product && !Number.isNaN(numericId) && requestedIdRef.current === numericId)
  ) {
    return (
      <div className="product-loading">
        <p>Loading…</p>
        <Link to="/products" className="link-btn">Back to products</Link>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="product-error">
        <p>Failed to load products{error ? `: ${error}` : ''}.</p>
        <Link to="/products" className="link-btn">Back to products</Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Product not found.</p>
        <Link to="/products" className="link-btn">Back to products</Link>
      </div>
    )
  }

  const defaults: ProductFormValues = {
    title: product.title,
    description: product.description,
    image: product.image,
    price: product.price,
  }

  const onSubmit = (data: ProductFormValues) => {
    dispatch(updateProduct({ ...product, ...data }))
    setShowToast(true)
  }

  return (
    <>
      <ProductForm
        title="Edit product"
        defaultValues={defaults}
        onSubmit={onSubmit}
        submitLabel="Save changes"
      />
      <div className="form__footer">
        <Link to={`/products/${product.id}`} className="link-btn">Cancel</Link>
      </div>
      {showToast && (
        <Toast
          message="Changes saved successfully!"
          onClose={() => { setShowToast(false); navigate(`/products/${product.id}`, { replace: true }) }}
        />
      )}
    </>
  )
}
