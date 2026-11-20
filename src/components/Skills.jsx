import { motion } from 'framer-motion'
import { skills } from '../data/skills.js'
import SectionHead from './SectionHead.jsx'
import Terminal from './Terminal.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  return (
    <section id="skills" className="sect">
      <div className="wrap">
        <SectionHead title="My Skills" sub="Technologies I Work With" />
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map(({ title, icon: Icon, items }, i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-line bg-ink-800 p-8">
                <div className="mb-6 flex items-center gap-3"><span className="rounded-xl bg-navy-800 p-2.5 text-glow-soft"><Icon size={20} /></span><h3 className="font-display text-3xl">{title}</h3></div>
                <ul className="flex flex-wrap gap-2.5">
                  {items.map((s) => <motion.li key={s} whileHover={{ y: -3 }} className="cursor-default rounded-full border border-line px-4 py-2 text-sm text-paper/90 transition-colors hover:border-glow hover:bg-navy-800 hover:text-paper">{s}</motion.li>)}
                </ul>
              </div>
            </Reveal>))}
        </div>
        <Reveal className="mt-14"><Terminal /></Reveal>
      </div>
    </section>
  )
}
