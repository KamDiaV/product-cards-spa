import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProductById, fetchProducts } from '../store/productsSlice'
import './ProductDetailsPage.css'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector(s => s.products)
  const product = items.find(p => String(p.id) === String(id))
  const requestedIdRef = useRef<number | null>(null)
  const numericId = id ? Number(id) : NaN
  const [isFetchingById, setIsFetchingById] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!Number.isNaN(numericId) && !product && requestedIdRef.current !== numericId) {
      requestedIdRef.current = numericId
      setIsFetchingById(true)
      setNotFound(false)
      dispatch(fetchProductById(numericId))
        .unwrap()
        .then(() => {
          setNotFound(false)
        })
        .catch(() => {
          setNotFound(true)
        })
        .finally(() => {
          if (requestedIdRef.current === numericId) requestedIdRef.current = null
          setIsFetchingById(false)
        })
    }
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
    if (product && requestedIdRef.current === numericId) {
      requestedIdRef.current = null
    }
  }, [numericId, product, status, dispatch])

  if (!product && (isFetchingById || status === 'idle' || status === 'loading')) {
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

  if (!product && notFound) {
    return (
      <div className="product-not-found">
        <p>Product not found.</p>
        <Link to="/products" className="link-btn">Back to products</Link>
      </div>
    )
  }

  if (!product) {
    return null
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
            <Link to={`/products/${product.id}/edit`} className="link-btn">Edit</Link>
          </div>
        </div>
      </section>
    </>
  )
}
