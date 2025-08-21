import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, type ProductFormValues } from '../validation/productSchema'

export default function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel = 'Save',
}: {
  defaultValues: ProductFormValues
  onSubmit: (data: ProductFormValues) => void
  submitLabel?: string
}) {
  const resolver: Resolver<ProductFormValues> = zodResolver(productSchema)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver,
    defaultValues,                      
  })

  const submit: SubmitHandler<ProductFormValues> = (data) => onSubmit(data)

  return (
    <form onSubmit={handleSubmit(submit)} style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
      <label>
        <div>Title</div>
        <input {...register('title')} />
        {errors.title && <small style={{ color: 'crimson' }}>{errors.title.message}</small>}
      </label>

      <label>
        <div>Description</div>
        <textarea rows={5} {...register('description')} />
        {errors.description && <small style={{ color: 'crimson' }}>{errors.description.message}</small>}
      </label>

      <label>
        <div>Image URL</div>
        <input {...register('image')} />
        {errors.image && <small style={{ color: 'crimson' }}>{errors.image.message}</small>}
      </label>

      <label>
        <div>Price</div>
        <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
        {errors.price && <small style={{ color: 'crimson' }}>{errors.price.message}</small>}
      </label>

      <button type="submit">{submitLabel}</button>
    </form>
  )
}