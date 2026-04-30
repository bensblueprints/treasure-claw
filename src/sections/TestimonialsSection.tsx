import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Quote, Tv, BookOpen, Radio } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = cardsRef.current?.children
    if (!cards) return

    gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

  }, { scope: sectionRef })

  const testimonials = [
    {
      quote: "Awesome prices and I actually won some nice things I luv this place.",
      author: "Fin Austin",
      role: "Regular Player",
    },
    {
      quote: "Wonderful little slice of Japan right in Twin Falls! Ideal for a fun time with younger kids, since playing the machines will be as much fun as winning the prizes will be, so it's a win win for everyone!",
      author: "Colvegrant",
      role: "First-time Visitor",
    },
    {
      quote: "So much fun! The owners made the experience really special for our kids. Easy to play, lots of prizes, and yummy snacks to try! We'll definitely go back!",
      author: "Christiana Sipe-Pauley",
      role: "Family Visitor",
    },
  ]

  const media = [
    { name: 'KMVT Channel 11', icon: Tv },
    { name: 'Magic Valley Magazine', icon: BookOpen },
    { name: 'Sounds of the Scene', icon: Radio },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="bg-accent-teal/10 border-accent-teal/40 text-accent-teal font-ui text-xs tracking-[0.14em] uppercase mb-4"
          >
            Reviews
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-[0.95]">
            Player Love
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="bg-card/50 border-border/60 hover:border-accent-pink/30 transition-all duration-300 hover:-translate-y-1 relative group"
            >
              <CardContent className="p-6">
                <Quote size={24} className="text-accent-pink/40 mb-4" />
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-accent-pink to-accent-teal">
                    <AvatarFallback className="font-ui font-bold text-background text-sm bg-transparent">
                      {t.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-ui font-semibold text-foreground text-sm">{t.author}</p>
                    <p className="font-body text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Media mentions */}
        <div className="mt-12 text-center">
          <p className="font-body text-muted-foreground text-sm mb-4">
            Featured in:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {media.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground/60">
                <m.icon size={14} className="text-accent-pink" />
                <span className="font-ui text-sm">{m.name}</span>
                {i < media.length - 1 && (
                  <span className="text-accent-pink ml-4">&bull;</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
