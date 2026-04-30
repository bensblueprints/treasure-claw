import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function TouchdownScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const clawRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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
    tl.fromTo(bgRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(clawRef.current,
      { y: '-40vh', opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0
    )
    tl.fromTo(headlineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.1
    )
    tl.fromTo(bodyRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.14
    )
    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.18
    )

    // SETTLE (30-70%) - neon ring pulses via CSS

    // EXIT (70-100%)
    tl.to(clawRef.current,
      { y: '-20vh', opacity: 0, ease: 'power2.in' },
      0.7
    )
    tl.to(headlineRef.current,
      { opacity: 0, y: -20, ease: 'power2.in' },
      0.72
    )
    tl.to(bodyRef.current,
      { opacity: 0, y: -20, ease: 'power2.in' },
      0.74
    )
    tl.to(ctaRef.current,
      { opacity: 0, ease: 'power2.in' },
      0.76
    )

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="scene-pinned z-[60] flex items-center justify-center bg-bg-primary"
    >
      {/* Background platform */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/platform.jpg"
          alt="Landing platform"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-primary/50" />
      </div>

      {/* Neon ring pulse */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[200px] animate-neon-pulse z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,58,140,0.3) 0%, rgba(24,242,178,0.2) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Claw lowering */}
      <img
        ref={clawRef}
        src="/claw-closed.jpg"
        alt="Delivering claw"
        className="absolute top-[5%] left-1/2 -translate-x-1/2 w-44 md:w-60 object-contain z-10"
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center h-full">
        <h2
          ref={headlineRef}
          className="font-display font-black text-6xl md:text-8xl lg:text-[100px] text-text-primary leading-[0.9] mb-6"
        >
          LEVEL UP
        </h2>

        <div ref={bodyRef} className="max-w-md mb-8">
          <p className="font-body text-text-secondary text-base md:text-lg">
            Turn a win into something bigger—swap, stack, and save for the ultimate prize.
          </p>
        </div>

        <div ref={ctaRef}>
          <button
            onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            See Upgrade Prizes
          </button>
        </div>
      </div>
    </section>
  )
}
