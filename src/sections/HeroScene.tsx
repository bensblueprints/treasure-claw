import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin, Clock, Star, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' }
    })

    tl.fromTo(contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(imageRef.current,
      { y: 50, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(statsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      '-=0.4'
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-gradient-hero pt-20 overflow-hidden"
      id="hero"
    >
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="container-custom w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={contentRef} className="pt-8 lg:pt-0">
            {/* Location pill */}
            <div className="inline-flex items-center gap-2.5 bg-brand/[0.08] text-brand font-ui text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full mb-8">
              <MapPin size={14} strokeWidth={2.5} />
              Twin Falls, Idaho
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-foreground tracking-tight leading-[1.08] mb-6">
              Welcome to{' '}
              <span className="text-brand">Treasure</span>
              <span className="text-brand">Claw</span>
            </h1>

            {/* Tagline */}
            <p className="font-ui text-lg md:text-xl text-muted-foreground font-medium tracking-wide uppercase mb-8">
              Play <span className="divider-dot inline-block mx-3 align-middle" /> Win <span className="divider-dot inline-block mx-3 align-middle" /> Upgrade
            </p>

            {/* Description */}
            <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md mb-10">
              Twin Falls' premier claw machine arcade. 20+ machines, anime & Disney plush, 
              viral snacks, and a prize upgrade system you won't find anywhere else in Idaho.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-premium text-base px-8 py-4 h-auto"
              >
                Contact Us
                <ChevronRight size={18} className="ml-1.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline-premium text-base px-8 py-4 h-auto"
              >
                Explore Services
              </Button>
            </div>

            {/* Meta info row */}
            <div ref={statsRef} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-brand shrink-0" strokeWidth={2} />
                <span className="font-body text-sm">Open Today 12PM–9PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-brand shrink-0" strokeWidth={2} />
                <span className="font-body text-sm">Behind Moxie Cafe</span>
              </div>
            </div>
          </div>

          {/* Image with floating badges */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-brand/5 ring-1 ring-black/5">
              <img
                src="/claw-open.jpg"
                alt="TreasureClaw claw machine"
                className="w-full h-[420px] sm:h-[500px] lg:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>

            {/* Floating stat badge — bottom left */}
            <div className="absolute -bottom-5 -left-2 sm:-left-5 bg-white rounded-2xl shadow-xl shadow-black/5 p-4 sm:p-5 border border-border/40">
              <p className="font-display font-bold text-brand text-2xl sm:text-3xl leading-none">20+</p>
              <p className="font-body text-muted-foreground text-xs sm:text-sm mt-1">Claw Machines</p>
            </div>

            {/* Floating rating badge — top right */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-2xl shadow-xl shadow-black/5 p-4 sm:p-5 border border-border/40">
              <div className="flex items-center gap-1.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="star-filled" fill="#E87722" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display font-bold text-foreground text-xl sm:text-2xl leading-none">4.9</p>
              <p className="font-body text-muted-foreground text-xs sm:text-sm mt-1">Google Rating</p>
            </div>

            {/* Mini trust badge — bottom right */}
            <div className="absolute -bottom-3 right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg shadow-black/5 px-4 py-2.5 border border-border/30">
              <p className="font-ui text-xs text-muted-foreground">
                <span className="text-brand font-semibold">500+</span> 5-Star Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
