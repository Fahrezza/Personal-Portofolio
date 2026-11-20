import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight, Check } from 'lucide-react'
import { projects } from '../data/projects.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import Img from './Img.jsx'

function Featured({ p }) {
  return (
    <Reveal>
      <article className="overflow-hidden rounded-[2rem] border border-line bg-ink-900">
        <Link to={`/projects/${p.slug}`} aria-label={`${p.title} case study`} className="group block overflow-hidden border-b border-line">
          <Img src={p.image} alt={`${p.title} application screenshot`} label={p.title} className="aspect-[16/8] w-full transition duration-700 group-hover:scale-[1.04]" />
        </Link>
        <div className="grid gap-10 p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
          <div>
            <p className="text-sm text-glow-soft">{p.category}</p>
            <h3 className="mt-2 font-display text-5xl md:text-6xl">{p.title}</h3>
            <p className="mt-5 max-w-lg leading-relaxed text-paper/90">{p.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="badge">{t}</li>)}</ul>
            {p.highlights && <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm text-paper/85 sm:grid-cols-2">{p.highlights.map((h) => <li key={h} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-glow-soft" />{h}</li>)}</ul>}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/projects/${p.slug}`} className="btn btn-primary">View Case Study <ArrowUpRight size={16} /></Link>
              <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-ghost"><Github size={16} /> Repository</a>
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-ghost"><ExternalLink size={16} /> Live demo</a>}
            </div>
          </div>
          <div>
            <p className="text-sm text-mist">My role</p>
            <p className="mb-5 mt-1 text-xl">{p.role}</p>
            <p className="mb-3 text-sm text-mist">My contributions</p>
            <div className="space-y-4">
              {Object.entries(p.contributions).map(([k, v]) => (
                <details key={k} className="group rounded-xl border border-line px-4 py-3 open:bg-navy-800/25" open={k === 'Frontend'}>
                  <summary className="cursor-pointer list-none text-sm font-medium marker:hidden">{k}</summary>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-paper/85">{v.map((i) => <li key={i}>{i}</li>)}</ul>
                </details>))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function Compact({ p }) {
  return (
    <Reveal>
      <motion.article whileHover={{ y: -4 }} className="grid gap-8 rounded-[2rem] border border-line bg-ink-800/50 p-8 md:grid-cols-[1fr_1.3fr] md:p-10">
        <Img src={p.image} alt={`${p.title} preview`} label={p.title} className="aspect-video w-full rounded-2xl" />
        <div>
          <p className="text-sm text-glow-soft">{p.category}</p>
          <h3 className="mt-1 font-display text-4xl">{p.title}</h3>
          <p className="mt-4 leading-relaxed text-paper/90">{p.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="badge">{t}</li>)}</ul>
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6"><Github size={16} /> Repository</a>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Projects() {
  const [first, ...rest] = projects
  return (
    <section id="projects" className="sect">
      <div className="wrap">
        <SectionHead title="Featured Projects" sub="Some Things I’ve Built" />
        <div className="space-y-10"><Featured p={first} />{rest.map((p) => <Compact key={p.slug} p={p} />)}</div>
      </div>
    </section>
  )
}
