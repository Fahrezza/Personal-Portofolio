import Reveal from './Reveal.jsx'
export default function SectionHead({ title, sub, center }) {
  return <Reveal className={`mb-14 ${center ? 'text-center' : ''}`}><h2 className="h-sec">{title}</h2><p className="sub">{sub}</p></Reveal>
}
