import './Tabs.css'

type Opt<T extends string> = {
  value: T
  label: string
}

type TabsProps<T extends string> = {
  value: T
  options: Opt<T>[]
  onChange: (v: T) => void
}

export default function Tabs<T extends string>({
  value,
  options,
  onChange,
}: TabsProps<T>) {
  return (
    <div className="tabs">
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`tab-item ${value === o.value ? 'tab-item--active' : ''}`}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
