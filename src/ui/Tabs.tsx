type Opt = { value: string; label: string }
export default function Tabs({
  value, options, onChange,
}: { value: string; options: Opt[]; onChange: (v: string) => void }) {
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