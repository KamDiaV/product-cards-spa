export default function SearchInput({
  value, onChange, placeholder,
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: '8px 12px',
        border: '1px solid #eee',
        borderRadius: 8,
        minWidth: 240,
      }}
    />
  )
}