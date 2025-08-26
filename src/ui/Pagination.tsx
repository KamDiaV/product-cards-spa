import './Pagination.css'

export default function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number
  pages: number
  onChange: (p: number) => void
}) {
  if (pages <= 1) return null

  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(pages, page + 1))

  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        onClick={prev}
        disabled={page === 1}
      >
        Prev
      </button>

      <span className="pagination__info">
        {page} / {pages}
      </span>

      <button
        className="pagination__btn"
        onClick={next}
        disabled={page === pages}
      >
        Next
      </button>
    </div>
  )
}