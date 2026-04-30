import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShoppingCart, Gamepad2, Diamond, ArrowRightLeft, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: ShoppingCart,
    title: 'Buy Tokens',
    desc: 'Tokens start at just $1 each. The more you buy, the more you save — bulk packs drop the price to $0.80 per token.',
    color: 'pink' as const,
    detail: '3 for $3 \u2022 10 for $9 \u2022 25 for $20',
  },
  {
    icon: Gamepad2,
    title: 'Play & Win',
    desc: 'Choose from 20+ claw machines. Each plush has a hidden diamond value from 1 to 3. Every grab is a chance to win big.',
    color: 'teal' as const,
    detail: 'Guaranteed win with $10 on 2+ machines',
  },
  {
    icon: Diamond,
    title: 'Earn Diamonds',
    desc: 'Stack your diamonds as you play. Rack up enough and you unlock the trade-up wall — where the real treasures live.',
    color: 'pink' as const,
    detail: 'Diamond values: 1-3 per plush won',
  },
  {
    icon: ArrowRightLeft,
    title: 'Trade Up',
    desc: 'Trade your diamond stash for epic prizes: PlayStations, giant Stitch plushes, rare collectibles, and more.',
    color: 'teal' as const,
    detail: 'Electronics \u2022 Giant plushes \u2022 Exclusives',
  },
]

export default function FeaturePanel() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const items = stepsRef.current?.children
    if (!items) return

    gsap.fromTo(items,
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
      }
    )

    gsap.fromTo(imageRef.current,
      { x: 30, opacity: 0, scale: 0.95 },
      {
        x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="bg-accent-pink/10 border-accent-pink/40 text-accent-pink font-ui text-xs tracking-[0.14em] uppercase mb-4"
          >
            How It Works
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-6xl text-foreground leading-[0.95] mb-4">
            Play to <span className="text-gradient-animated">Upgrade</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            Our unique diamond system turns every win into progress toward epic prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Timeline */}
          <div ref={stepsRef} className="relative space-y-8">
            {/* Vertical connector line */}
            <div className="absolute left-[27px] top-12 bottom-12 w-[2px] bg-gradient-to-b from-accent-pink/50 via-accent-teal/50 to-accent-pink/50 hidden md:block" />

            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-5 group">
                {/* Step number circle */}
                <div className="relative z-10 shrink-0">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    step.color === 'pink'
                      ? 'bg-accent-pink/15 text-accent-pink ring-1 ring-accent-pink/30'
                      : 'bg-accent-teal/15 text-accent-teal ring-1 ring-accent-teal/30'
                  }`}>
                    <step.icon size={24} />
                  </div>
                </div>

                {/* Content card */}
                <div className="glass-card p-5 flex-1 group-hover:border-white/15 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-ui font-bold text-xs uppercase tracking-wider ${
                      step.color === 'pink' ? 'text-accent-pink' : 'text-accent-teal'
                    }`}>
                      Step {i + 1}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-foreground mb-2">
                    {step.title}
                  </h4>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-3">
                    {step.desc}
                  </p>
                  <p className={`font-ui text-xs ${
                    step.color === 'pink' ? 'text-accent-pink/80' : 'text-accent-teal/80'
                  }`}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}

            <div className="pl-[76px] pt-2">
              <Button
                onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-glow-pink"
              >
                View Inventory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Portal image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-square ring-1 ring-white/10 shadow-[0_0_60px_rgba(255,58,140,0.15)]">
              <img
                src="/portal-plush.jpg"
                alt="Plush in neon portal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30" />
              {/* Floating orb decorations */}
              <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-accent-pink/20 blur-2xl" />
              <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-accent-teal/20 blur-2xl" />
            </div>
            {/* Neon ring decorations */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border border-accent-pink/20 animate-neon-pulse" />
            <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full border border-accent-teal/20 animate-neon-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
