import { useEffect, useState } from 'react'

// Types, holds, erases and retypes. The full text is rendered invisibly so the line never shifts.
export default function Typewriter({ text, className = '' }) {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [n, setN] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) return
    let dir = 1, i = 0, t
    const tick = () => {
      i += dir; setN(i)
      let d = dir === 1 ? 90 + Math.random() * 60 : 35
      if (dir === 1 && i === text.length) { dir = -1; d = 5000 }
      else if (dir === -1 && i === 0) { dir = 1; d = 900 }
      t = setTimeout(tick, d)
    }
    t = setTimeout(tick, 600)
    return () => clearTimeout(t)
  }, [text, reduced])

  return (
    <span className={`relative block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible">{text}</span>
      <span aria-hidden className="absolute inset-0">
        {text.slice(0, n)}
        <span className={`ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.05em] bg-glow-soft ${reduced ? '' : 'animate-blink'}`} />
      </span>
    </span>
  )
}
