import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function SkylineTravelScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const clawRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.5,
      }
    })

    // ENTRANCE (0-30%)
    tl.fromTo(bgRef.current,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, ease: 'none' },
      0
    )
    tl.fromTo(clawRef.current,
      { x: '-60vw', opacity: 0 },
      { x: 0, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(headlineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.08
    )

    // SETTLE (30-70%) - claw drifts, badges appear
    tl.to(clawRef.current,
      { x: '18vw', ease: 'none' },
      0.3
    )
    tl.fromTo(badgesRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'none' },
      0.4
    )
    tl.fromTo(bodyRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, ease: 'none' },
      0.45
    )

    // EXIT (70-100%)
    tl.to(clawRef.current,
      { x: '55vw', y: '18vh', opacity: 0, ease: 'power2.in' },
      0.7
    )
    tl.to(headlineRef.current,
      { opacity: 0, y: -30, ease: 'power2.in' },
      0.72
    )
    tl.to(bodyRef.current,
      { opacity: 0, y: -20, ease: 'power2.in' },
      0.74
    )
    tl.to(badgesRef.current,
      { opacity: 0, ease: 'power2.in' },
      0.75
    )
    tl.to(bgRef.current,
      { scale: 1.08, ease: 'none' },
      0.7
    )

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="scene-pinned z-50 flex items-center justify-center bg-bg-primary"
    >
      {/* Background city */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/city-skyline.jpg"
          alt="City skyline"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary/70" />
      </div>

      {/* Claw traveling */}
      <img
        ref={clawRef}
        src="/claw-closed.jpg"
        alt="Traveling claw"
        className="absolute top-[20%] w-40 md:w-56 object-contain z-10"
      />

      {/* Headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
        <h2
          ref={headlineRef}
          className="font-display font-black text-6xl md:text-8xl lg:text-[120px] text-text-primary leading-[0.9]"
        >
          GLOW UP
        </h2>
      </div>

      {/* Floating badges */}
      <div ref={badgesRef} className="absolute top-[35%] right-[15%] z-20 flex flex-col gap-2 opacity-0">
        <div className="pill-pink">Diamond Club</div>
        <div className="pill-teal">Early Access</div>
        <div className="pill-pink">Upgrades</div>
      </div>

      {/* Body copy */}
      <div ref={bodyRef} className="absolute bottom-12 right-6 md:right-12 z-20 max-w-sm text-right opacity-0">
        <p className="font-body text-text-secondary text-sm md:text-base">
          Trade diamonds for upgrades: consoles, giant plushes, rare collectibles.
        </p>
      </div>
    </section>
  )
}
