import { useEffect, useRef } from 'react'


const SIZE = 360 // 360 = kecil, 480 = sedang, 640 = besar

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const q = (m) => window.matchMedia(m).matches
    const el = ref.current
    if (!el || q('(hover: none)') || q('(pointer: coarse)') || q('(prefers-reduced-motion: reduce)')) return

    let x = 0, y = 0, raf = 0, shown = false, base = 0.5

    const draw = () => {
      raf = 0
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`
    }
    const move = (e) => {
      x = e.clientX; y = e.clientY
      if (!shown) { shown = true; el.style.opacity = String(base) }
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const over = (e) => {
      base = e.target instanceof Element && e.target.closest('a,button,summary,input,textarea,label') ? 0.7 : 0.5
      if (shown) el.style.opacity = String(base)
    }
    const leave = () => { shown = false; el.style.opacity = '0' }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        opacity: 0,
        transition: 'opacity .25s ease', 
        background:
          'radial-gradient(circle, rgba(246,250,253,.09) 0%, rgba(246,250,253,.035) 38%, rgba(246,250,253,0) 70%)',
      }}
    />
  )
}