import { Routes, Route, Navigate, Link } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CreateProductPage from './pages/CreateProductPage'

export default function App() {
  return (
    <div className="app">
      <header className="container">
        <nav className="nav">
          <Link to="/products">Products</Link>
          <Link to="/create-product">Create</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </main>
    </div>
  )
}