import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '../components/ui/button'
import { MapPin, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    gsap.fromTo(contentRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )
    gsap.fromTo(imageRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-24 overflow-hidden"
      id="hero"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl" />

      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div ref={contentRef}>
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand font-ui text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin size={14} />
              Twin Falls, Idaho
            </div>
            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[1.1] mb-6">
              Welcome to <span className="text-brand">TREASURECLAW</span>
            </h1>
            <p className="font-ui text-xl md:text-2xl text-muted-foreground font-semibold tracking-widest uppercase mb-6">
              Play &nbsp;&bull;&nbsp; Win &nbsp;&bull;&nbsp; Upgrade
            </p>
            <p className="font-body text-muted-foreground text-lg max-w-lg mb-8">
              Treasure Claw brings fun, affordable claw-machine entertainment for all ages in Twin Falls, Idaho.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand text-white hover:bg-brand-dark font-ui font-semibold text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-brand text-brand hover:bg-brand hover:text-white font-ui font-semibold text-lg px-8 py-6 h-auto"
              >
                Our Services
              </Button>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-brand" />
                <span className="font-body text-sm">Open Today 12PM–9PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-brand" />
                <span className="font-body text-sm">Behind Moxie Cafe</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
              <img
                src="/claw-open.jpg"
                alt="TreasureClaw claw machine"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-border">
              <p className="font-display font-bold text-brand text-2xl">20+</p>
              <p className="font-body text-muted-foreground text-sm">Claw Machines</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-border">
              <p className="font-display font-bold text-brand text-2xl">4.9</p>
              <p className="font-body text-muted-foreground text-sm">Google Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
