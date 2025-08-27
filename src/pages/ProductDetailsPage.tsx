import { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import ProductForm from '../ui/ProductForm'
import { updateProduct, fetchProducts } from '../store/productsSlice'
import type { ProductFormValues } from '../validation/productSchema'
import Toast from '../ui/Toast'
import './ProductDetailsPage.css'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [sp] = useSearchParams()
  const isEdit = sp.get('edit') === '1'

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { items, status, error } = useSelector((s: RootState) => s.products)
  const product = items.find(p => String(p.id) === String(id))
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === 'idle' || status === 'loading') {
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
      <>
        <div className="product-not-found">
          <p>Product not found.</p>
          <Link to="/products" className="link-btn">Back to products</Link>
        </div>
        {showToast && (
          <Toast message="Changes saved!" onClose={() => setShowToast(false)} />
        )}
      </>
    )
  }

  if (isEdit) {
    const defaults: ProductFormValues = {
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
    }

    const onSubmit = (data: ProductFormValues) => {
      dispatch(updateProduct({ ...product, ...data }))
      setShowToast(true)
      navigate(`/products/${product.id}`, { replace: true })
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
          <Link to="/products" className="link-btn">Back to products</Link>
        </div>
        {showToast && (
          <Toast
            message="Changes saved successfully!"
            onClose={() => setShowToast(false)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <section className="product">
        <div className="product__media">
          <img
            className="product__img"
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            width={600}
            height={600}
          />
        </div>
        <div className="product__content">
          <h1 className="product__title">{product.title}</h1>
          <strong className="product__price">${product.price.toFixed(2)}</strong>
          <p className="product__desc">{product.description}</p>
          <div className="product__actions">
            <Link to="/products" className="link-btn">← Back to list</Link>
            <Link to={`/products/${product.id}?edit=1`} className="link-btn">Edit</Link>
          </div>
        </div>
      </section>
      {showToast && (
        <Toast
          message="Changes saved successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}
