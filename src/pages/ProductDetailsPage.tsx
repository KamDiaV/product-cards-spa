import { useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import ProductForm from '../ui/ProductForm'
import { updateProduct } from '../store/productsSlice'
import type { ProductFormValues } from '../validation/productSchema'
import Toast from '../ui/Toast'
import './ProductDetailsPage.css'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [sp] = useSearchParams()
  const isEdit = sp.get('edit') === '1'

  const dispatch = useDispatch()
  const product = useSelector((s: RootState) =>
    s.products.items.find(p => String(p.id) === String(id)),
  )

  const [showToast, setShowToast] = useState(false)

  if (!product) {
    return (
      <>
        <div className="product-not-found">
          <p>Product not found.</p>
          <Link to="/products" className="link-btn">← Back to list</Link>
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
      window.history.replaceState(null, '', `/products/${product.id}`)
    }

    return (
      <>
        <section className="edit-section">
          <h1>Edit product</h1>
          <ProductForm
            defaultValues={defaults}
            onSubmit={onSubmit}
            submitLabel="Save changes"
          />
          <Link to={`/products/${product.id}`} className="link-btn cancel-btn">
            Cancel
          </Link>
        </section>

        {showToast && (
          <Toast message="Changes saved successfully!" onClose={() => setShowToast(false)} />
        )}
      </>
    )
  }

  return (
    <>
      <section className="product">
        <div className="product__media">
          <img className="product__img" src={product.image} alt={product.title} />
        </div>

        <div className="product__content">
          <h1 className="product__title">{product.title}</h1>
          <strong className="product__price">${product.price.toFixed(2)}</strong>
          <p className="product__desc">{product.description}</p>

          <div className="product__actions">
            <Link to="/products" className="link-btn">← Back to list</Link>
            <Link to={`/products/${product.id}?edit=1`} className="link-btn">
              Edit
            </Link>
          </div>
        </div>
      </section>

      {showToast && (
        <Toast message="Changes saved successfully!" onClose={() => setShowToast(false)} />
      )}
    </>
  )
}