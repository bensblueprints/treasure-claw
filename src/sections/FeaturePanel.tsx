import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShoppingCart, Gamepad2, Diamond, ArrowRightLeft, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

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
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )

    gsap.fromTo(imageRef.current,
      { scale: 0.96, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, delay: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )

    gsap.fromTo(ctaRef.current,
      { y: 10, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.4, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )

  }, { scope: sectionRef })

  const steps = [
    {
      icon: ShoppingCart,
      title: 'Buy Tokens',
      desc: '$1–$0.80 per token. The more you buy, the more you save.',
      color: 'pink' as const,
    },
    {
      icon: Gamepad2,
      title: 'Play & Win',
      desc: 'Choose your plush and play for the win. Every grab counts.',
      color: 'teal' as const,
    },
    {
      icon: Diamond,
      title: 'Earn Diamonds',
      desc: 'Won plush has a diamond value of 1–3. Stack them up.',
      color: 'pink' as const,
    },
    {
      icon: ArrowRightLeft,
      title: 'Trade Up',
      desc: 'Trade diamonds for PlayStations, giant Stitch, collectibles.',
      color: 'teal' as const,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div ref={cardRef}>
            <Badge
              variant="outline"
              className="bg-accent-pink/10 border-accent-pink/40 text-accent-pink font-ui text-xs tracking-[0.14em] uppercase mb-4"
            >
              How It Works
            </Badge>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-[0.95] mb-6">
              TreasureClaw<br />in 60 Seconds
            </h2>
            <p className="font-body text-muted-foreground text-base mb-8">
              Our unique play-to-upgrade system means every win gets you closer to the ultimate prize.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {steps.map((step, i) => (
                <Card
                  key={i}
                  className="bg-card/50 border-border/60 hover:border-accent-pink/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card group"
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`rounded-lg p-2 shrink-0 ${step.color === 'pink' ? 'bg-accent-pink/10' : 'bg-accent-teal/10'}`}>
                      <step.icon size={20} className={step.color === 'pink' ? 'text-accent-pink' : 'text-accent-teal'} />
                    </div>
                    <div>
                      <h4 className="font-ui font-semibold text-foreground text-sm mb-1">
                        {step.title}
                      </h4>
                      <p className="font-body text-muted-foreground text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div ref={ctaRef}>
              <Button
                onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent-pink text-background hover:bg-accent-pink/90 font-ui font-semibold shadow-neon-pink transition-all hover:-translate-y-0.5"
              >
                View Inventory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Portal image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square ring-1 ring-border/60 shadow-card">
              <img
                src="/portal-plush.jpg"
                alt="Plush in neon portal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
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
