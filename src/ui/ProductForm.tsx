import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, type ProductFormValues } from '../validation/productSchema'
import './ProductForm.css'

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
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver,
    defaultValues,
    mode: 'onTouched',
  })

  const submit: SubmitHandler<ProductFormValues> = (data) => onSubmit(data)

  return (
    <form className="form" onSubmit={handleSubmit(submit)} noValidate>
      <h2 className="form__title">{submitLabel} product</h2>

      <div className="form__group">
        <label className="form__label" htmlFor="title">Title</label>
        <input
          id="title"
          className="form__control"
          placeholder="Enter product title"
          aria-invalid={!!errors.title || undefined}
          aria-describedby={errors.title ? 'error-title' : undefined}
          {...register('title')}
        />
        {errors.title && (
          <p id="error-title" className="form__error">{errors.title.message}</p>
        )}
      </div>

      <div className="form__group">
        <label className="form__label" htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          className="form__control"
          placeholder="Short description"
          aria-invalid={!!errors.description || undefined}
          aria-describedby={errors.description ? 'error-description' : undefined}
          {...register('description')}
        />
        {errors.description && (
          <p id="error-description" className="form__error">{errors.description.message}</p>
        )}
        <p className="form__hint">Keep it concise and informative.</p>
      </div>

      <div className="form__row">
        <div className="form__group">
          <label className="form__label" htmlFor="image">Image URL</label>
          <input
            id="image"
            className="form__control"
            placeholder="https://…"
            aria-invalid={!!errors.image || undefined}
            aria-describedby={errors.image ? 'error-image' : undefined}
            {...register('image')}
          />
          {errors.image && (
            <p id="error-image" className="form__error">{errors.image.message}</p>
          )}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="price">Price ($)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min={0}
            className="form__control"
            placeholder="0.00"
            aria-invalid={!!errors.price || undefined}
            aria-describedby={errors.price ? 'error-price' : undefined}
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <p id="error-price" className="form__error">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="form__actions">
        <button
          type="button"
          className="btn"
          onClick={() => reset(defaultValues)}
        >
          Reset
        </button>
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}