import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '../components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    gsap.fromTo(contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-brand-light to-white pt-24"
      id="hero"
    >
      <div ref={contentRef} className="text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-black text-5xl md:text-7xl text-foreground tracking-tight mb-4">
          Welcome to <span className="text-brand">TREASURECLAW</span>
        </h1>
        <p className="font-ui text-xl md:text-2xl text-muted-foreground font-semibold tracking-widest uppercase mb-8">
          Play &nbsp;&bull;&nbsp; Win &nbsp;&bull;&nbsp; Upgrade
        </p>
        <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Treasure Claw brings fun, affordable claw-machine entertainment for all ages in Twin Falls, Idaho.
        </p>
        <Button
          size="lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-brand text-white hover:bg-brand-dark font-ui font-semibold text-lg px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
        >
          Contact Us
        </Button>
      </div>

      {/* Decorative shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
