import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: 'TOKENS',
    subtitle: 'BUY YOUR TOKENS $1-\u00A2 0.80 PER TOKEN',
    desc: 'Get started with tokens. The more you buy, the more you save!',
  },
  {
    title: 'PLUSH TOY',
    subtitle: 'Choose your plush and play for the win.',
    desc: 'Pick your favorite machine and go for the grab!',
  },
  {
    title: 'DIAMONDS',
    subtitle: 'Your won plush has a diamond value of 1-3.',
    desc: 'Diamonds are the currency for the upgrades prize and stack.',
  },
  {
    title: 'UPGRADE PRIZE',
    subtitle: 'Trade your diamonds for your desired prize.',
    desc: 'Such as the PlayStation, giant stitch or collectables!',
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
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-slate-50" id="how-it-works">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            HOW IT WORKS
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-display font-bold text-brand text-lg">
                  {step.title}
                </h4>
                <ArrowRight size={16} className="text-brand" />
              </div>
              <div className="h-px bg-border mb-4" />
              <p className="font-body text-foreground text-sm font-medium mb-2">
                {step.subtitle}
              </p>
              <p className="font-body text-muted-foreground text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
