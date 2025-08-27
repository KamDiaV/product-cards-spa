import type React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { toggleLike, deleteProduct } from '../store/productsSlice'
import type { Product } from '../types'

import HeartIcon from '../assets/icons/heart.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import EditIcon from '../assets/icons/edit.svg?react'

import './ProductCard.css'

export default function ProductCard({ product }: { product: Product }) {
  const nav = useNavigate()
  const dispatch = useAppDispatch()

  const liked = product.liked
  const open = () => nav(`/products/${product.id}`)

  const like = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(toggleLike(product.id))

    const btn = e.currentTarget        
    btn.classList.remove('pulse')      
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(() => {
        btn.classList.add('pulse')
        setTimeout(() => btn.classList.remove('pulse'), 300) 
      })
    }
  }

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(deleteProduct(product.id))
  }

  const edit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    nav(`/products/${product.id}?edit=1`)
  }

  return (
    <article className="card" onClick={open} role="button" aria-label={`Open ${product.title}`}>
      <button
        type="button"
        onClick={like}
        className={`card__like ${liked ? 'is-liked' : ''}`}
        aria-pressed={liked}
        aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon aria-hidden />
      </button>

      <img className="card__img" src={product.image} alt={product.title} />

      <header>
        <h3 className="card__title">{product.title}</h3>
        <p className="card__desc">{product.description}</p>
      </header>

      <footer className="card__footer">
        <span className="card__price">${product.price.toFixed(2)}</span>

        <div>
          <button
            type="button"
            onClick={edit}
            className="icon"
            aria-label="Edit product"
            title="Edit"
          >
            <EditIcon aria-hidden />
          </button>

          <button
            type="button"
            onClick={remove}
            className="icon"
            aria-label="Delete product"
            title="Delete"
          >
            <TrashIcon aria-hidden />
          </button>
        </div>
      </footer>
    </article>
  )
}