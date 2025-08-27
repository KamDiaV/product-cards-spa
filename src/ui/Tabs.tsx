type Opt<T extends string> = { value: T; label: string }
export default function Tabs<T extends string>({
  value, options, onChange,
}: { value: T; options: Opt<T>[]; onChange: (v: T) => void }) {
  return (
    <div style={{ display: 'inline-flex', border: '1px solid #eee', borderRadius: 10, overflow: 'hidden' }}>
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{
            padding: '8px 12px',
            background: value === o.value ? '#111' : '#fff',
            color: value === o.value ? '#fff' : '#111',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
