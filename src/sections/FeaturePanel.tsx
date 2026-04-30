import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShoppingCart, Gamepad2, Diamond, ArrowRightLeft } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturePanel() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo(imageRef.current,
      { scale: 0.96, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo(ctaRef.current,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

  }, { scope: sectionRef })

  const steps = [
    {
      icon: ShoppingCart,
      title: 'Buy Tokens',
      desc: '$1–$0.80 per token. The more you buy, the more you save.',
    },
    {
      icon: Gamepad2,
      title: 'Play & Win',
      desc: 'Choose your plush and play for the win. Every grab counts.',
    },
    {
      icon: Diamond,
      title: 'Earn Diamonds',
      desc: 'Won plush has a diamond value of 1–3. Stack them up.',
    },
    {
      icon: ArrowRightLeft,
      title: 'Trade Up',
      desc: 'Trade diamonds for PlayStations, giant Stitch, collectibles.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-bg-primary py-24 md:py-32"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div ref={cardRef}>
            <span className="font-ui text-accent-pink text-sm tracking-[0.14em] uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-text-primary leading-[0.95] mb-6">
              TreasureClaw<br />in 60 Seconds
            </h2>
            <p className="font-body text-text-secondary text-base mb-8">
              Our unique play-to-upgrade system means every win gets you closer to the ultimate prize.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="card-dark p-4 flex items-start gap-3"
                >
                  <div className="bg-accent-pink/10 rounded-lg p-2 shrink-0">
                    <step.icon size={20} className="text-accent-pink" />
                  </div>
                  <div>
                    <h4 className="font-ui font-semibold text-text-primary text-sm mb-1">
                      {step.title}
                    </h4>
                    <p className="font-body text-text-secondary text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={ctaRef}>
              <button
                onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View Inventory
              </button>
            </div>
          </div>

          {/* Portal image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img
                src="/portal-plush.jpg"
                alt="Plush in neon portal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent" />
            </div>
            {/* Floating neon ring decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-2 border-accent-pink/30 animate-neon-pulse" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-accent-teal/30 animate-neon-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
