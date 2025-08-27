import { useEffect } from 'react'
import './Toast.css'

export default function Toast({
  message,
  onClose,
  duration = 1000,
}: {
  message: string
  onClose: () => void
  duration?: number
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="toast">
      {message}
    </div>
  )
}