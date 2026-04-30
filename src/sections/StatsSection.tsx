import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Gamepad2, Users, Trophy, Star } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Gamepad2, value: 20, suffix: '+', label: 'Claw Machines', color: 'pink' as const },
  { icon: Users, value: 5000, suffix: '+', label: 'Happy Players', color: 'teal' as const },
  { icon: Trophy, value: 1000, suffix: '+', label: 'Prizes Won Monthly', color: 'pink' as const },
  { icon: Star, value: 4.9, suffix: '', label: 'Google Rating', color: 'teal' as const, isDecimal: true },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = cardsRef.current?.children
    if (!cards) return

    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )

    // Animate numbers
    Array.from(cards).forEach((card, i) => {
      const el = card.querySelector('.stat-number')
      if (!el) return
      const target = stats[i].value
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
        onUpdate: () => {
          if (stats[i].isDecimal) {
            el.textContent = obj.val.toFixed(1)
          } else {
            el.textContent = Math.floor(obj.val).toLocaleString()
          }
        }
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative z-[70] bg-background py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="glass-card-strong border-0 hover:-translate-y-1 transition-transform duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  stat.color === 'pink' ? 'bg-accent-pink/15 text-accent-pink' : 'bg-accent-teal/15 text-accent-teal'
                }`}>
                  <stat.icon size={24} />
                </div>
                <div className="font-display font-black text-3xl md:text-4xl text-foreground mb-1">
                  <span className="stat-number">0</span>
                  <span className={stat.color === 'pink' ? 'text-accent-pink' : 'text-accent-teal'}>{stat.suffix}</span>
                </div>
                <p className="font-body text-muted-foreground text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
