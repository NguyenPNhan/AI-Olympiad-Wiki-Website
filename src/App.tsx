import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import './App.css'

const ArticlePage = lazy(() => import('./pages/ArticlePage'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/article/*" element={<Suspense fallback={<div className="page-loading">Loading article…</div>}><ArticlePage /></Suspense>} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}
