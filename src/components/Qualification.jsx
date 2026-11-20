import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { education } from '../data/experience.js'
import SectionHead from './SectionHead.jsx'

// Vertical timeline: a centered line on desktop with items alternating right/left, a single column on mobile.
export default function Qualification() {
  return (
    <section id="experience" className="sect">
      <div className="wrap">
        <SectionHead center title="My Journey" sub="Education" />
        <ol className="relative mx-auto max-w-4xl">
          <span aria-hidden className="absolute bottom-2 top-2 left-[7px] w-px bg-line md:left-1/2" />
          {education.map((e, i) => {
            const left = i % 2 === 1
            return (
              <motion.li key={`${e.level}-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}
                className={`relative pb-12 pl-10 last:pb-0 md:w-1/2 ${left ? 'md:pl-0 md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                <span aria-hidden className={`absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-ink-950 bg-glow-soft ${left ? 'md:left-auto md:-right-[7px]' : 'md:-left-[7px]'}`} />
                <h3 className="font-display text-3xl">{e.level}</h3>
                <p className="mt-1 text-mist">{e.name}</p>
                <p className={`mt-3 flex items-center gap-2 text-sm text-mist ${left ? 'md:justify-end' : ''}`}><CalendarDays size={15} aria-hidden />{e.start} – {e.end}</p>
              </motion.li>)
          })}
        </ol>
      </div>
    </section>
  )
}