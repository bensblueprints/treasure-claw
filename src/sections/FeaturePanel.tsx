import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Coins, ToyBrick, Diamond, Gift } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Buy Tokens',
    subtitle: '$1 per token · $0.80 when you buy 20+',
    desc: 'The more you buy, the more you save. Tokens work on every machine in the arcade.',
    icon: Coins,
  },
  {
    num: '02',
    title: 'Play & Win',
    subtitle: 'Choose your plush and go for the grab',
    desc: 'Pick your favorite machine and test your skills. Every win is a rush of excitement.',
    icon: ToyBrick,
  },
  {
    num: '03',
    title: 'Collect Diamonds',
    subtitle: 'Each plush has a diamond value of 1–3',
    desc: 'Diamonds are your currency for bigger prizes. They stack and never expire.',
    icon: Diamond,
  },
  {
    num: '04',
    title: 'Upgrade Prize',
    subtitle: 'Trade diamonds for your dream prize',
    desc: 'Save up for a PlayStation, giant Stitch plush, rare collectibles, and more.',
    icon: Gift,
  },
]

export default function FeaturePanel() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = cardsRef.current?.children
    if (!cards) return

    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-warm" id="how-it-works">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-overline justify-center">
            <span className="w-8 h-px bg-brand" />
            The Process
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="section-heading mb-5">
            How It Works
          </h2>
          <p className="section-subtext mx-auto">
            Four simple steps from your first token to your ultimate prize. 
            Our unique upgrade system makes every visit more rewarding.
          </p>
        </div>

        {/* Steps */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-6 lg:p-8 border border-border/50 group hover:border-brand/20 transition-colors duration-500"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.02)' }}
            >
              {/* Connector line (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-border">
                  <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 rounded-full bg-brand/30" />
                </div>
              )}

              {/* Number & Icon */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-display font-black text-4xl text-brand/10 group-hover:text-brand/20 transition-colors duration-500">
                  {step.num}
                </span>
                <div className="w-11 h-11 rounded-xl bg-brand/[0.08] flex items-center justify-center group-hover:bg-brand/[0.15] transition-colors duration-500">
                  <step.icon size={20} className="text-brand" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <h4 className="font-display font-bold text-base text-foreground mb-2">
                {step.title}
              </h4>
              <p className="font-ui text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                {step.subtitle}
              </p>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
