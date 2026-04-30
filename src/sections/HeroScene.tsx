import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Sparkles, CalendarDays } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const clawRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.5,
        onLeaveBack: () => {
          gsap.set([clawRef.current, headlineRef.current, subheadRef.current, ctaRef.current, badgeRef.current, bgRef.current], {
            clearProps: 'all'
          })
        }
      }
    })

    // ENTRANCE (0-30%)
    tl.fromTo(bgRef.current,
      { opacity: 0, scale: 1.08 },
      { opacity: 1, scale: 1, ease: 'none' },
      0
    )
    tl.fromTo(clawRef.current,
      { y: '-120px', opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.06
    )
    tl.fromTo(subheadRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.12
    )
    tl.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.18
    )
    tl.fromTo(badgeRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'none' },
      0.24
    )

    // EXIT (70-100%)
    tl.to(headlineRef.current,
      { y: -40, opacity: 0, ease: 'power2.in' },
      0.7
    )
    tl.to(subheadRef.current,
      { y: -30, opacity: 0, ease: 'power2.in' },
      0.72
    )
    tl.to(ctaRef.current,
      { y: -30, opacity: 0, ease: 'power2.in' },
      0.74
    )
    tl.to(clawRef.current,
      { y: '-100px', opacity: 0, ease: 'power2.in' },
      0.75
    )
    tl.to(badgeRef.current,
      { opacity: 0, ease: 'power2.in' },
      0.76
    )
    tl.to(bgRef.current,
      { scale: 1.06, ease: 'none' },
      0.7
    )

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="scene-pinned z-10 flex items-center justify-center"
      id="hero"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/city-skyline.jpg"
          alt="Neon city skyline"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
      </div>

      {/* Claw arm at top */}
      <img
        ref={clawRef}
        src="/claw-open.jpg"
        alt="Claw machine arm"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 md:w-56 object-contain z-10 drop-shadow-2xl"
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <h1
          ref={headlineRef}
          className="font-display font-black text-6xl md:text-8xl lg:text-[120px] text-foreground leading-[0.9] tracking-tight mb-6"
        >
          GRAB IT.
        </h1>

        <div ref={subheadRef} className="mb-8">
          <p className="font-ui text-xl md:text-2xl text-accent-teal font-semibold mb-2 tracking-wide">
            PLAY. WIN. UPGRADE.
          </p>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
            A claw-machine arcade for all ages in Twin Falls, Idaho.
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent-pink text-background hover:bg-accent-pink/90 font-ui font-semibold text-lg px-8 py-6 shadow-neon-pink transition-all hover:-translate-y-0.5"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Reserve a Party
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-accent-teal text-accent-teal hover:bg-accent-teal/10 hover:text-foreground font-ui font-semibold text-lg px-8 py-6 transition-all hover:-translate-y-0.5"
          >
            <CalendarDays className="mr-2 h-5 w-5" />
            See Events
          </Button>
        </div>
      </div>

      {/* Neon badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <Badge
          variant="outline"
          className="bg-accent-teal/10 border-accent-teal/40 text-accent-teal font-ui text-sm px-4 py-1.5 animate-neon-pulse"
        >
          Now Open &bull; Twin Falls, ID
        </Badge>
      </div>
    </section>
  )
}
