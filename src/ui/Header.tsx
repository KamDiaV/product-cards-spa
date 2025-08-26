import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/products" className="nav__link">
          Products
        </Link>
        <Link to="/create" className="nav__link">
          Create
        </Link>
      </nav>
    </header>
  )
}