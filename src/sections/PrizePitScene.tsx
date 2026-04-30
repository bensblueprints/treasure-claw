import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function PrizePitScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const clawRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
      }
    })

    // ENTRANCE (0-30%)
    tl.fromTo(bgRef.current,
      { scale: 1.12, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(clawRef.current,
      { y: '-120px', opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.05
    )
    tl.fromTo(headlineRef.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, ease: 'none' },
      0.1
    )
    tl.fromTo(bodyRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, ease: 'none' },
      0.15
    )

    // SETTLE (30-70%) - bg micro-float via CSS

    // EXIT (70-100%)
    tl.to(clawRef.current,
      { scale: 0.85, y: -60, opacity: 0, ease: 'power2.in' },
      0.7
    )
    tl.to(headlineRef.current,
      { y: -24, opacity: 0, ease: 'power2.in' },
      0.72
    )
    tl.to(bodyRef.current,
      { y: -24, opacity: 0, ease: 'power2.in' },
      0.74
    )
    tl.to(bgRef.current,
      { scale: 1.06, ease: 'none' },
      0.7
    )

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="scene-pinned z-30 flex items-center justify-center bg-bg-primary"
    >
      {/* Background plush pile */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/prize-pit.jpg"
          alt="Prize pit plush toys"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/30 to-bg-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-bg-primary/40" />
      </div>

      {/* Overhead claw */}
      <img
        ref={clawRef}
        src="/claw-open.jpg"
        alt="Overhead claw"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 md:w-52 object-contain z-10"
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between h-full py-24">
        <div className="max-w-lg">
          <h2
            ref={headlineRef}
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-text-primary leading-[0.9] mb-6"
          >
            THE PRIZE<br />PIT
          </h2>
        </div>

        <div ref={bodyRef} className="max-w-sm md:text-right mt-6 md:mt-0 self-end md:self-center">
          <p className="font-body text-text-secondary text-base md:text-lg mb-4">
            Anime, Disney, gaming collectibles—plus viral Asian snacks and specialty ice creams you won't find anywhere else in the Magic Valley.
          </p>
          <button
            onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-ui text-accent-teal hover:text-text-primary transition-colors text-sm underline underline-offset-4"
          >
            Browse Inventory
          </button>
        </div>
      </div>
    </section>
  )
}
