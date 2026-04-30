import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ClawDescendScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const clawRef = useRef<HTMLImageElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.5,
      }
    })

    // ENTRANCE (0-30%)
    tl.fromTo(portalRef.current,
      { scale: 0.35, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(clawRef.current,
      { y: '-50vh', opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(labelRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.1
    )

    // SETTLE (30-70%) - portal breathes via CSS, not scroll animation

    // EXIT (70-100%)
    tl.to(clawRef.current,
      { y: '40vh', opacity: 0, ease: 'power2.in' },
      0.7
    )
    tl.to(portalRef.current,
      { scale: 1.35, opacity: 0, ease: 'power2.in' },
      0.72
    )
    tl.to(labelRef.current,
      { opacity: 0, ease: 'power2.in' },
      0.75
    )

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="scene-pinned z-20 flex items-center justify-center bg-bg-primary"
    >
      {/* Portal disc */}
      <div
        ref={portalRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[900px] md:h-[500px] animate-neon-pulse"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,58,140,0.5) 0%, rgba(24,242,178,0.3) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Claw arm */}
      <img
        ref={clawRef}
        src="/claw-open.jpg"
        alt="Descending claw"
        className="absolute top-[5%] left-1/2 -translate-x-1/2 w-48 md:w-64 object-contain z-10"
      />

      {/* Label */}
      <div
        ref={labelRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <span className="font-display font-black text-4xl md:text-6xl text-text-primary/20 tracking-[0.2em]">
          THE DROP
        </span>
      </div>

      {/* Bottom copy */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20 max-w-md">
        <p className="font-body text-text-secondary text-sm md:text-base">
          One play. One grab. One shot at the prize.
        </p>
      </div>
    </section>
  )
}
