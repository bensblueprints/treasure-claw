import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Sparkles, CalendarDays, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const clawRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

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
          gsap.set([clawRef.current, headlineRef.current, subheadRef.current, ctaRef.current, badgeRef.current, bgRef.current, glowRef.current], {
            clearProps: 'all'
          })
        }
      }
    })

    // ENTRANCE (0-30%)
    tl.fromTo(bgRef.current,
      { opacity: 0, scale: 1.12 },
      { opacity: 1, scale: 1, ease: 'none' },
      0
    )
    tl.fromTo(glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, ease: 'none' },
      0
    )
    tl.fromTo(clawRef.current,
      { y: '-150px', opacity: 0, rotate: -5 },
      { y: 0, opacity: 1, rotate: 0, ease: 'none' },
      0
    )
    tl.fromTo(headlineRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, ease: 'none' },
      0.06
    )
    tl.fromTo(subheadRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.12
    )
    tl.fromTo(ctaRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.18
    )
    tl.fromTo(badgeRef.current,
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, ease: 'none' },
      0.24
    )

    // EXIT (70-100%)
    tl.to(headlineRef.current,
      { y: -50, opacity: 0, ease: 'power2.in' },
      0.7
    )
    tl.to(subheadRef.current,
      { y: -35, opacity: 0, ease: 'power2.in' },
      0.72
    )
    tl.to(ctaRef.current,
      { y: -35, opacity: 0, ease: 'power2.in' },
      0.74
    )
    tl.to(clawRef.current,
      { y: '-120px', opacity: 0, ease: 'power2.in' },
      0.75
    )
    tl.to(badgeRef.current,
      { opacity: 0, ease: 'power2.in' },
      0.76
    )
    tl.to(bgRef.current,
      { scale: 1.08, ease: 'none' },
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
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/90" />
        {/* Radial glow behind content */}
        <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-pink/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Claw arm at top */}
      <img
        ref={clawRef}
        src="/claw-open.jpg"
        alt="Claw machine arm"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-44 md:w-60 object-contain z-10 drop-shadow-[0_0_30px_rgba(255,58,140,0.3)]"
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <h1
          ref={headlineRef}
          className="font-display font-black text-7xl md:text-9xl lg:text-[140px] leading-[0.85] tracking-tighter mb-8"
        >
          <span className="text-gradient-animated">GRAB IT.</span>
        </h1>

        <div ref={subheadRef} className="mb-10">
          <p className="font-ui text-2xl md:text-3xl text-accent-teal font-bold mb-3 tracking-widest uppercase neon-glow-teal">
            Play. Win. Upgrade.
          </p>
          <p className="font-body text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
            Twin Falls' premier claw-machine arcade. Where every grab gets you closer to the ultimate prize.
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glow-pink text-lg px-8 py-6 h-auto"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Reserve a Party
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glow-teal text-lg px-8 py-6 h-auto"
          >
            <CalendarDays className="mr-2 h-5 w-5" />
            See Events
          </Button>
        </div>
      </div>

      {/* Neon badge + scroll hint */}
      <div
        ref={badgeRef}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <Badge
          variant="outline"
          className="bg-accent-teal/10 border-accent-teal/50 text-accent-teal font-ui text-sm px-5 py-2 animate-neon-pulse backdrop-blur-sm"
        >
          Now Open &bull; Twin Falls, ID
        </Badge>
        <div className="animate-bounce text-muted-foreground/50">
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  )
}
