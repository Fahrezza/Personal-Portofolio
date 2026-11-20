import { useState } from 'react'
// Shows the real image from /public/images; falls back to a purple placeholder if the file is missing.
export default function Img({ src, alt, label = 'F', className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) return (
    <div role="img" aria-label={alt} className={`flex items-center justify-center bg-ink-800 ${className}`}>
      <span className="font-display text-6xl text-glow-soft/70">{label}</span>
    </div>)
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
