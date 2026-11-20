import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react'
import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'

const empty = { name: '', email: '', subject: '', message: '' }
const validate = (v) => {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address, like name@example.com.'
  if (v.subject.trim().length < 3) e.subject = 'Add a short subject.'
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters.'
  return e
}

export default function Contact() {
  const [v, setV] = useState(empty)
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); setSent(false) }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(v); setErr(found)
    if (Object.keys(found).length) return
    // Frontend-only: opens the visitor's email app. Replace with Formspree/EmailJS or your own API when ready.
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name} (${v.email})`)}`
    setSent(true); setV(empty)
  }

  const field = (k, label, props = {}) => (
    <div>
      <label htmlFor={k} className="mb-2 block text-sm text-mist">{label}</label>
      {k === 'message'
        ? <textarea id={k} rows={5} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} className="field" />
        : <input id={k} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} className="field" {...props} />}
      {err[k] && <p id={`${k}-e`} role="alert" className="mt-1.5 text-sm text-red-300">{err[k]}</p>}
    </div>
  )

  return (
    <section id="contact" className="sect">
      <style>{`.field{width:100%;border-radius:.9rem;border:1px solid #303030;background:#1E1E1E;padding:.8rem 1rem;color:#F6FAFD;transition:border-color .2s}.field:focus{border-color:#B3CFE5;outline:none}.field[aria-invalid=true]{border-color:#fca5a5}`}</style>
      <div className="wrap grid gap-14 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h2 className="h-sec">Let’s Connect</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/90">I’m always open to discussing technology, sharing ideas, collaborating on projects, and exploring new opportunities.</p>
          <ul className="mt-10 space-y-4">
            {[[Mail, site.email, `mailto:${site.email}`], [Github, 'GitHub', site.github], [Linkedin, 'LinkedIn', site.linkedin]].map(([Icon, label, href]) => (
              <li key={label}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group inline-flex items-center gap-3 text-mist transition-colors hover:text-glow-soft"><span className="rounded-full border border-line p-2.5 group-hover:border-glow"><Icon size={18} /></span>{label}</a></li>))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="space-y-5 rounded-[2rem] border border-line bg-ink-900/70 p-8">
            <div className="grid gap-5 sm:grid-cols-2">{field('name', 'Name', { autoComplete: 'name' })}{field('email', 'Email', { type: 'email', autoComplete: 'email' })}</div>
            {field('subject', 'Subject')}{field('message', 'Message')}
            <button className="btn btn-primary w-full justify-center"><Send size={16} /> Send message</button>
            {sent && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status" className="flex items-center gap-2 text-sm text-glow-soft"><CheckCircle2 size={16} /> Your email app is opening with the message filled in. Press send there to finish.</motion.p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
