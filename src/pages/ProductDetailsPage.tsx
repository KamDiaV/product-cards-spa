import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import ProductForm from '../ui/ProductForm'
import { updateProduct } from '../store/productsSlice'
import type { ProductFormValues } from '../validation/productSchema'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [sp] = useSearchParams() 
  const isEdit = sp.get('edit') === '1' 

  const dispatch = useDispatch()
  const product = useSelector((s: RootState) =>
    s.products.items.find(p => String(p.id) === String(id)),
  )

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link to="/products">← Back to list</Link>
      </div>
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
      window.history.replaceState(null, '', `/products/${product.id}`)
    }

    return (
      <section style={{ display: 'grid', gap: 16 }}>
        <h1>Edit product</h1>
        <ProductForm defaultValues={defaults} onSubmit={onSubmit} submitLabel="Save changes" />
        <Link to={`/products/${product.id}`}>Cancel</Link>
      </section>
    )
  }

  return (
    <article style={{ display: 'grid', gap: 16 }}>
      <img src={product.image} alt={product.title} style={{ maxWidth: 480, borderRadius: 12 }} />
      <h1>{product.title}</h1>
      <strong>${product.price}</strong>
      <p>{product.description}</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/products">← Back to list</Link>
        <Link to={`/products/${product.id}?edit=1`}>Edit</Link>
      </div>
    </article>
  )
}