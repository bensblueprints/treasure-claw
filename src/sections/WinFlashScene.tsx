import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function WinFlashScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const clawRef = useRef<HTMLImageElement>(null)
  const winRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
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
      }
    })

    // ENTRANCE (0-30%)
    tl.fromTo(clawRef.current,
      { y: '-20vh', opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(bodyRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.1
    )
    tl.fromTo(badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.15
    )

    // FLASH BEAT (45-55%) - within settle
    tl.fromTo(flashRef.current,
      { opacity: 0 },
      { opacity: 0.6, ease: 'power2.out', duration: 0.05 },
      0.45
    )
    tl.to(flashRef.current,
      { opacity: 0, ease: 'power2.in', duration: 0.06 },
      0.48
    )
    tl.fromTo(winRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'elastic.out(1, 0.5)', duration: 0.12 },
      0.50
    )

    // EXIT (70-100%)
    tl.to(winRef.current,
      { opacity: 0, y: -30, ease: 'power2.in' },
      0.7
    )
    tl.to(bodyRef.current,
      { opacity: 0, y: -20, ease: 'power2.in' },
      0.72
    )
    tl.to(badgeRef.current,
      { opacity: 0, y: -20, ease: 'power2.in' },
      0.74
    )
    tl.to(clawRef.current,
      { x: '12vw', opacity: 0, ease: 'power2.in' },
      0.72
    )
    tl.to(bgRef.current,
      { x: '-12vw', ease: 'none' },
      0.7
    )

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="scene-pinned z-40 flex items-center justify-center bg-bg-primary overflow-hidden"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/prize-pit.jpg"
          alt="Prize background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-bg-primary/40" />
      </div>

      {/* White flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white z-30 pointer-events-none opacity-0"
      />

      {/* WIN text */}
      <div
        ref={winRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 opacity-0"
      >
        <span className="font-display font-black text-8xl md:text-[160px] text-accent-teal neon-glow-teal">
          WIN
        </span>
      </div>

      {/* Closed claw with plush */}
      <img
        ref={clawRef}
        src="/claw-closed.jpg"
        alt="Claw grabbing prize"
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 md:w-64 object-contain z-20"
      />

      {/* Body copy */}
      <div ref={bodyRef} className="absolute bottom-12 left-6 md:left-12 z-20 max-w-md">
        <p className="font-body text-text-secondary text-sm md:text-base">
          You don't just leave with a plush—you earn diamonds.
        </p>
      </div>

      {/* Diamond badge */}
      <div ref={badgeRef} className="absolute bottom-12 right-6 md:right-12 z-20">
        <div className="pill-pink font-semibold">
          +1–3 Diamonds
        </div>
      </div>
    </section>
  )
}
