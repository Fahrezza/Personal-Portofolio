import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { site, nav } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="bg-ink-950">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div><p className="font-display text-2xl">{site.name}</p><p className="mt-1 text-sm text-mist">© {new Date().getFullYear()} Fahreza. All rights reserved.</p></div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">{nav.map(([l, id]) => <li key={id}><a className="hover:text-paper" href={`/#${id}`}>{l}</a></li>)}</ul>
        <div className="flex items-center gap-4 text-mist">
          <a aria-label="GitHub" href={site.github} target="_blank" rel="noreferrer" className="hover:text-glow"><Github size={18} /></a>
          <a aria-label="LinkedIn" href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-glow"><Linkedin size={18} /></a>
          <a aria-label="Email" href={`mailto:${site.email}`} className="hover:text-glow"><Mail size={18} /></a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-ghost !px-4 !py-2">Back to top <ArrowUp size={14} /></button>
        </div>
      </div>
    </footer>
  )
}
