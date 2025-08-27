import { Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CreateProductPage from './pages/CreateProductPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import EditProductPage from './pages/EditProductPage'
import Header from './ui/Header'
import Footer from './ui/Footer'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/:id/edit" element={<EditProductPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
