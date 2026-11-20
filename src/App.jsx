import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Cursor from './components/Cursor.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'

export default function App() {
  const location = useLocation()
  useEffect(() => { if (location.pathname !== '/') window.scrollTo(0, 0) }, [location.pathname])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-navy-700 focus:px-4 focus:py-2">Skip to content</a>
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main id="main" key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
