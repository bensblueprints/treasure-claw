import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Gem, Star, Crown, Trophy, Sparkles } from 'lucide-react'
import { Badge } from '../components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

const prizes = [
  { icon: Sparkles, name: 'Anime Plushes', desc: 'Attack on Titan, Demon Slayer, My Hero Academia', color: 'pink' as const, count: '50+' },
  { icon: Star, name: 'Disney Collection', desc: 'Stitch, Kuromi, Cinnamoroll, Sanrio favorites', color: 'teal' as const, count: '40+' },
  { icon: Gem, name: 'Gaming Collectibles', desc: 'Pokemon, Mario, Zelda, Kirby plushies & keychains', color: 'pink' as const, count: '80+' },
  { icon: Crown, name: 'Giant Plushes', desc: 'Jumbo Stitch, oversized bears, limited editions', color: 'teal' as const, count: '15+' },
  { icon: Trophy, name: 'Electronics', desc: 'PlayStation, Nintendo Switch, gaming accessories', color: 'pink' as const, count: '10+' },
  { icon: Sparkles, name: 'Asian Snacks', desc: 'Viral treats, specialty ice creams, imported candy', color: 'teal' as const, count: '30+' },
]

export default function PrizesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = gridRef.current?.children
    if (!cards) return

    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32"
      id="prizes"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-accent-pink/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="bg-accent-pink/10 border-accent-pink/40 text-accent-pink font-ui text-xs tracking-[0.14em] uppercase mb-4"
          >
            What You Can Win
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-6xl text-foreground leading-[0.95] mb-4">
            Prize <span className="text-gradient-pink">Inventory</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            New items added regularly to keep every visit fresh and exciting.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map((prize, i) => (
            <div
              key={i}
              className="gradient-border-card p-6 group hover:scale-[1.02] transition-all duration-300 cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-xl p-3 ${
                  prize.color === 'pink' ? 'bg-accent-pink/10' : 'bg-accent-teal/10'
                }`}>
                  <prize.icon
                    size={24}
                    className={prize.color === 'pink' ? 'text-accent-pink' : 'text-accent-teal'}
                  />
                </div>
                <span className={`font-display font-bold text-2xl ${
                  prize.color === 'pink' ? 'text-accent-pink/30' : 'text-accent-teal/30'
                } group-hover:text-opacity-60 transition-opacity`}>
                  {prize.count}
                </span>
              </div>
              <h4 className="font-display font-bold text-xl text-foreground mb-2">
                {prize.name}
              </h4>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {prize.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-16 flex justify-center">
          <div className="glass-card-strong inline-flex items-center gap-4 px-8 py-5">
            <div className="w-12 h-12 rounded-full bg-accent-pink/15 flex items-center justify-center shrink-0">
              <Trophy size={22} className="text-accent-pink" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground text-base mb-0.5">
                The TreasureClaw Guarantee
              </p>
              <p className="font-body text-muted-foreground text-sm">
                At least one plush or keychain guaranteed with $10 played on 2+ machines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
