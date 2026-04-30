import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Gem, Star, Crown, Trophy, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

export default function PrizesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = gridRef.current?.children
    if (!cards) return

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

  }, { scope: sectionRef })

  const prizes = [
    { icon: Sparkles, name: 'Anime Plushes', desc: 'Attack on Titan, Demon Slayer, My Hero Academia', color: 'pink' as const },
    { icon: Star, name: 'Disney Collection', desc: 'Stitch, Kuromi, Cinnamoroll, Sanrio favorites', color: 'teal' as const },
    { icon: Gem, name: 'Gaming Collectibles', desc: 'Pokemon, Mario, Zelda, Kirby plushies & keychains', color: 'pink' as const },
    { icon: Crown, name: 'Giant Plushes', desc: 'Jumbo Stitch, oversized bears, limited editions', color: 'teal' as const },
    { icon: Trophy, name: 'Electronics', desc: 'PlayStation, Nintendo Switch, gaming accessories', color: 'pink' as const },
    { icon: Sparkles, name: 'Asian Snacks', desc: 'Viral treats, specialty ice creams, imported candy', color: 'teal' as const },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32"
      id="prizes"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="bg-accent-pink/10 border-accent-pink/40 text-accent-pink font-ui text-xs tracking-[0.14em] uppercase mb-4"
          >
            What You Can Win
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-[0.95] mb-4">
            Prize Inventory
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-lg mx-auto">
            New items added regularly to keep every visit fresh and exciting.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map((prize, i) => (
            <Card
              key={i}
              className="bg-card/50 border-border/60 hover:border-accent-pink/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-neon-pink group cursor-default"
            >
              <CardHeader className="pb-3">
                <div className={`rounded-xl p-3 w-fit ${prize.color === 'pink' ? 'bg-accent-pink/10' : 'bg-accent-teal/10'}`}>
                  <prize.icon
                    size={24}
                    className={prize.color === 'pink' ? 'text-accent-pink' : 'text-accent-teal'}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-ui font-bold text-foreground text-lg mb-2">
                  {prize.name}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {prize.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 flex justify-center">
          <Card className="bg-accent-pink/5 border-accent-pink/30 inline-flex">
            <CardContent className="flex items-center gap-3 px-6 py-4">
              <Trophy size={20} className="text-accent-pink shrink-0" />
              <p className="font-body text-foreground text-sm">
                <strong>Our Guarantee:</strong> We guarantee at least one plush toy or keychain with $10 played on 2+ machines (excluding MeDolls).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
