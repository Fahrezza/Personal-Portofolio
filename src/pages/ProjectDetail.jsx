import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink, ArrowDown } from 'lucide-react'
import { projects } from '../data/projects.js'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'

const Box = ({ children, strong }) => <div className={`rounded-2xl border px-6 py-4 text-center ${strong ? 'border-glow bg-navy-800' : 'border-line bg-ink-800'}`}>{children}</div>
const Link2 = ({ label }) => <div className="flex flex-col items-center py-1 text-sm text-mist"><ArrowDown size={16} className="text-glow" />{label && <span>{label}</span>}</div>

function Architecture() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-stretch" role="img" aria-label="React frontend calls Express.js backend over HTTP REST API, which connects to MySQL database">
      <Box strong><p className="font-medium">React Frontend</p><p className="text-sm text-mist">User interface</p></Box><Link2 label="HTTP / REST API" />
      <Box><p className="font-medium">Express.js Backend</p><p className="text-sm text-mist">Auth & business logic</p></Box><Link2 />
      <Box><p className="font-medium">MySQL Database</p><p className="text-sm text-mist">Relational data</p></Box>
    </div>)
}

function Block({ n, title, children }) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr]">
        <h2 className="font-display text-3xl"><span className="mr-3 text-glow/70">{n}.</span>{title}</h2>
        <div className="max-w-2xl leading-relaxed text-paper/90">{children}</div>
      </section>
    </Reveal>)
}
const List = ({ items }) => <ul className="list-disc space-y-2 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug)
  if (!p) return <div className="wrap py-40"><p>Project not found.</p><Link to="/" className="text-glow">Back home</Link></div>
  const c = p.caseStudy
  return (
    <article className="pt-28">
      <div className="wrap">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-mist hover:text-glow"><ArrowLeft size={16} /> All projects</Link>
        <p className="mt-10 text-sm text-glow-soft">{p.category}</p>
        <h1 className="mt-2 font-display text-6xl md:text-8xl">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-paper/90">{p.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="badge">{t}</li>)}</ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-primary"><Github size={16} /> Repository</a>
          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-ghost"><ExternalLink size={16} /> Live demo</a>}
        </div>
        <Img src={p.image} alt={`${p.title} screenshot`} label={p.title} className="mt-14 aspect-[16/8] w-full rounded-[2rem] border border-line" />
        {c ? (
          <div className="mt-14 pb-24">
            {c.draft && <p className="mb-4 rounded-xl border border-line bg-ink-800 px-4 py-3 text-sm text-mist">Draft: review every section and rewrite it with your own experience before publishing.</p>}
            <Block n={1} title="Overview"><p>{c.overview}</p><p className="mt-4 text-mist">Role: {p.role}</p></Block>
            <Block n={2} title="Problem Statement"><p>{c.problem}</p></Block>
            <Block n={3} title="Objectives"><List items={c.objectives} /></Block>
            <Block n={4} title="System Architecture"><p className="mb-8">{c.architecture}</p><Architecture /></Block>
            <Block n={5} title="Frontend Development"><p>{c.frontend}</p><div className="mt-4"><List items={p.contributions.Frontend} /></div></Block>
            <Block n={6} title="Backend Development"><p>{c.backend}</p><div className="mt-4"><List items={p.contributions.Backend} /></div></Block>
            <Block n={7} title="Database Integration"><p>{c.database}</p><div className="mt-4"><List items={p.contributions.Database} /></div></Block>
            <Block n={8} title="Technical Challenges"><List items={c.challenges} /></Block>
            <Block n={9} title="Solutions"><List items={c.solutions} /></Block>
            <Block n={10} title="Lessons Learned"><List items={c.lessons} /></Block>
          </div>
        ) : <p className="mt-14 pb-24 text-mist">A detailed case study for this project is not available yet.</p>}
      </div>
    </article>
  )
}
