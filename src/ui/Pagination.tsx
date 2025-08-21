export default function Pagination({
  page, pages, onChange,
}: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null
  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(pages, page + 1))
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
      <button onClick={prev} disabled={page === 1}>Prev</button>
      <span>{page} / {pages}</span>
      <button onClick={next} disabled={page === pages}>Next</button>
    </div>
  )
}