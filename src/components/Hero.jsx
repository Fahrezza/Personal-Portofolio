import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ArrowDown } from 'lucide-react'
import { site } from '../data/site.js'
import Typewriter from './Typewriter.jsx'
import Img from './Img.jsx'

const up = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: 'easeOut' } })

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24">
      <div className="wrap grid items-center gap-14 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          <motion.p {...up(0.1)} className="mb-6 inline-flex items-center gap-2 text-sm text-mist">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-glow" /></span>
            {site.status}
          </motion.p>
          <motion.h1 {...up(0.2)} className="font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl"><Typewriter text="Hi there! I'm Fahreza" /></motion.h1>
          <motion.p {...up(0.3)} className="mt-4 font-display text-3xl italic text-glow-soft md:text-4xl">Full Stack Engineer</motion.p>
          <motion.p {...up(0.4)} className="mt-8 max-w-xl text-lg leading-relaxed text-paper/90">I’m an Informatics student passionate about building digital products, developing software systems, and exploring technologies from frontend to backend.</motion.p>
          <motion.p {...up(0.5)} className="mt-4 max-w-xl leading-relaxed text-mist">I enjoy turning ideas into functional applications, solving technical problems, and continuously learning through real world projects.</motion.p>
          <motion.div {...up(0.6)} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn btn-primary"><Mail size={16} /> Contact me</a>
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-ghost !px-3.5"><Github size={18} /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-ghost !px-3.5"><Linkedin size={18} /></a>
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm text-mist"><MapPin size={15} />{site.location}</span>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="order-first w-48 overflow-hidden rounded-[22px] border border-line sm:w-60 md:order-last md:w-72 lg:w-80">
          <Img src="/images/portrait.jpg" alt="Portrait of Fahreza" label="F" className="aspect-square w-full transition duration-500 hover:scale-105" />
        </motion.div>
      </div>
      <a href="#about" aria-label="Scroll down" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mist hover:text-glow">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="block"><ArrowDown /></motion.span>
      </a>
    </section>
  )
}
