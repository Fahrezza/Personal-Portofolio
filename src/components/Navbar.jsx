import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { site, nav } from '../data/site.js'

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
  // On a project page no menu item is highlighted.
  if (pathname !== '/') { setActive(null); return }
  setActive('home')
  let io, timer
  // After a page transition the home sections mount late, so retry until they exist.
  const attach = () => {
    const els = nav.map(([, id]) => document.getElementById(id)).filter(Boolean)
    if (els.length < nav.length) { timer = setTimeout(attach, 100); return }
    io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
  }
  attach()
  return () => { clearTimeout(timer); io?.disconnect() }
}, [pathname])

  const go = (id) => (e) => {
    e.preventDefault(); setOpen(false)
    if (pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    else { navigate('/'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 450) }
  }

  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main" className="wrap relative flex h-20 items-center justify-between">
        <a href="/" onClick={go('home')} className="font-display text-2xl tracking-wide">{site.name}</a>
        <ul className="hidden items-center gap-1 rounded-full border border-line bg-ink-900/60 p-1.5 backdrop-blur-md md:flex">
          {nav.map(([label, id]) => (
            <li key={id} className="relative">
              <a href={`/#${id}`} onClick={go(id)} aria-current={active === id ? 'page' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${active === id ? 'text-paper' : 'text-mist hover:text-paper'}`}>
                {active === id && <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute inset-0 -z-10 rounded-full bg-navy-800" />}
                {label}
              </a>
            </li>))}
        </ul>
        <button className="rounded-full border border-line bg-ink-900/60 p-2.5 backdrop-blur-md md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        <AnimatePresence>
          {open && (
            <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute inset-x-6 top-[4.5rem] rounded-2xl border border-line bg-ink-900/90 p-2 backdrop-blur-md md:hidden">
              {nav.map(([label, id]) => <li key={id}><a href={`/#${id}`} onClick={go(id)} className={`block rounded-xl px-4 py-3 ${active === id ? 'bg-navy-800 text-paper' : 'text-mist'}`}>{label}</a></li>)}
            </motion.ul>)}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
