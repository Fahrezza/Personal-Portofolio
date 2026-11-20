import { Download } from 'lucide-react'
import { site } from '../data/site.js'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function About() {
  return (
    <section id="about" className="sect">
      <div className="wrap">
        <SectionHead title="About Me" sub="Get to Know Me" />
        <div className="grid items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <Reveal><div className="w-44 overflow-hidden rounded-[20px] border border-line sm:w-52 md:w-60"><Img src="/images/about.jpg" alt="Fahreza at a developer workspace" label="</>" className="aspect-square w-full transition duration-500 hover:scale-105" /></div></Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-xl space-y-5 text-lg leading-relaxed text-paper/90">
              <p>I’m an Informatics student with a strong interest in software development, particularly Full-Stack Web Development.</p>
              <p>I enjoy exploring how applications work, from designing user interfaces to developing backend services and managing databases.</p>
              <p>Through academic projects and collaborative development, I’ve been learning how to turn ideas into working applications while improving my problem-solving and engineering skills.</p>
            </div>
            <a href={site.cv} download className="btn btn-primary mt-9"><Download size={16} /> Download CV</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
