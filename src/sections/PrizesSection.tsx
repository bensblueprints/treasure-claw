import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Gem, Star, Crown, Trophy, Sparkles } from 'lucide-react'

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
    { icon: Sparkles, name: 'Anime Plushes', desc: 'Attack on Titan, Demon Slayer, My Hero Academia', color: 'pink' },
    { icon: Star, name: 'Disney Collection', desc: 'Stitch, Kuromi, Cinnamoroll, Sanrio favorites', color: 'teal' },
    { icon: Gem, name: 'Gaming Collectibles', desc: 'Pokemon, Mario, Zelda, Kirby plushies & keychains', color: 'pink' },
    { icon: Crown, name: 'Giant Plushes', desc: 'Jumbo Stitch, oversized bears, limited editions', color: 'teal' },
    { icon: Trophy, name: 'Electronics', desc: 'PlayStation, Nintendo Switch, gaming accessories', color: 'pink' },
    { icon: Sparkles, name: 'Asian Snacks', desc: 'Viral treats, specialty ice creams, imported candy', color: 'teal' },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-bg-primary py-24 md:py-32"
      id="prizes"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="font-ui text-accent-pink text-sm tracking-[0.14em] uppercase mb-4 block">
            What You Can Win
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-text-primary leading-[0.95] mb-4">
            Prize Inventory
          </h2>
          <p className="font-body text-text-secondary text-base max-w-lg mx-auto">
            New items added regularly to keep every visit fresh and exciting.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map((prize, i) => (
            <div
              key={i}
              className="card-dark p-6 group hover:border-accent-pink/30 transition-colors"
            >
              <div className={`bg-${prize.color === 'pink' ? 'accent-pink' : 'accent-teal'}/10 rounded-xl p-3 w-fit mb-4`}>
                <prize.icon
                  size={24}
                  className={prize.color === 'pink' ? 'text-accent-pink' : 'text-accent-teal'}
                />
              </div>
              <h4 className="font-ui font-bold text-text-primary text-lg mb-2">
                {prize.name}
              </h4>
              <p className="font-body text-text-secondary text-sm">
                {prize.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-accent-pink/10 border border-accent-pink/30 rounded-xl px-6 py-4">
            <Trophy size={20} className="text-accent-pink" />
            <p className="font-body text-text-primary text-sm">
              <strong>Our Guarantee:</strong> We guarantee at least one plush toy or keychain with $10 played on 2+ machines (excluding MeDolls).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
