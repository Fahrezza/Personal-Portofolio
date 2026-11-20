import { Fragment, useEffect, useRef, useState } from 'react'
import { Folder } from 'lucide-react'
import { skills } from '../data/skills.js'

// Directories come from data/skills.js, so the terminal always matches the skill cards.
const dirs = skills.map((s) => ({ key: s.title.toLowerCase().split(' ')[0], items: s.items }))
const alias = { 'front-end': 'frontend', 'back-end': 'backend', db: 'database', tool: 'tools' }
const helpRows = [['whoami', 'who I am'], ['ls', 'lists directories'], ['ls <directory>', 'technologies in the directory'], ['all', 'shows everything'], ['clear', 'clears the terminal']]
const quick = ['help', 'all', ...dirs.map((d) => `ls ${d.key}`), 'clear']

function exec(raw) {
  const [cmd, ...args] = raw.trim().split(/\s+/)
  if (!cmd) return null
  if (cmd === 'whoami') return { type: 'text', lines: ['Informatics student · Full-Stack Web Development'] }
  if (cmd === 'help') return { type: 'help' }
  if (cmd === 'all') return { type: 'all' }
  if (cmd === 'ls') {
    if (!args.length || args[0] === '.' || args[0] === '~') return { type: 'dirs' }
    const k = args[0].replace(/\/$/, '').toLowerCase()
    const dir = dirs.find((d) => d.key === (alias[k] || k))
    return dir ? { type: 'items', dir } : { type: 'text', error: true, lines: [`ls: no such directory: ${args[0]}`] }
  }
  return { type: 'text', error: true, lines: [`command not found: ${cmd}. Type "help" to see available commands.`] }
}

function Out({ o, run }) {
  if (o.type === 'text') return <p className={o.error ? 'text-red-300' : 'text-paper'}>{o.lines.join('\n')}</p>
  if (o.type === 'help') return (
    <div>
      <p className="text-paper">available commands:</p>
      <div className="mt-1 grid grid-cols-[auto_1fr] gap-x-8 pl-2 text-mist">{helpRows.map(([c, d]) => <Fragment key={c}><span>{c}</span><span>{d}</span></Fragment>)}</div>
    </div>)
  if (o.type === 'dirs') return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
      {dirs.map((d) => <li key={d.key}><button type="button" onClick={() => run(`ls ${d.key}`)} className="inline-flex items-center gap-2 text-glow-soft hover:underline"><Folder size={14} />{d.key}</button></li>)}
    </ul>)
  if (o.type === 'items') return <ul className="flex flex-wrap gap-x-6 gap-y-1 pl-2 text-paper">{o.dir.items.map((i) => <li key={i}>{i}</li>)}</ul>
  return (
    <div className="space-y-2">
      {dirs.map((d) => <p key={d.key}><span className="text-glow-soft">{d.key}/</span> <span className="text-paper">{d.items.join('  ')}</span></p>)}
    </div>)
}

export default function Terminal() {
  const [log, setLog] = useState(() => ['whoami', 'help', 'ls'].map((c) => ({ cmd: c, out: exec(c) })))
  const [value, setValue] = useState('')
  const body = useRef(null), input = useRef(null)
  const hist = useRef({ list: [], i: 0 })

  useEffect(() => { body.current && (body.current.scrollTop = body.current.scrollHeight) }, [log])

  const run = (raw) => {
    const c = raw.trim()
    if (c) { hist.current.list.push(c); hist.current.i = hist.current.list.length }
    if (c === 'clear') return setLog([])
    setLog((l) => [...l, { cmd: c, out: exec(c) }])
  }
  const onKey = (e) => {
    const h = hist.current
    if (e.key === 'Enter') { run(value); setValue('') }
    else if (e.key === 'ArrowUp') { e.preventDefault(); h.i = Math.max(0, h.i - 1); setValue(h.list[h.i] ?? '') }
    else if (e.key === 'ArrowDown') { e.preventDefault(); h.i = Math.min(h.list.length, h.i + 1); setValue(h.list[h.i] ?? '') }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLog([]) }
  }

  return (
    <div role="group" aria-label="Interactive skills terminal" className="overflow-hidden rounded-2xl border border-line bg-ink-900 font-mono text-sm transition-colors focus-within:border-glow/50">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        {[0, 1, 2].map((i) => <span key={i} aria-hidden className="h-3 w-3 rounded-full bg-line" />)}
        <span className="ml-3 text-xs text-mist">fahreza@skills: zsh</span>
      </div>
      <div ref={body} onClick={() => input.current?.focus({ preventScroll: true })} className="max-h-[26rem] min-h-[18rem] cursor-text space-y-2 overflow-y-auto px-5 py-5 leading-relaxed" aria-live="polite">
        {log.map((l, i) => (
          <div key={i} className="space-y-2">
            <p className="text-mist"><span className="mr-2 text-glow">❯</span>{l.cmd}</p>
            {l.out && <Out o={l.out} run={run} />}
          </div>))}
        <label className="flex items-center text-paper">
          <span className="mr-2 text-glow">❯</span>
          <input ref={input} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey} aria-label="Terminal command" placeholder='type "help"' autoComplete="off" autoCapitalize="off" spellCheck={false}
            className="w-full bg-transparent text-paper caret-glow-soft outline-none focus-visible:outline-none placeholder:text-mist/50" />
        </label>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line px-5 py-3 text-xs text-mist">
        {quick.map((c) => <button key={c} type="button" onClick={() => run(c)} className="hover:text-glow-soft">{c}</button>)}
      </div>
    </div>
  )
}