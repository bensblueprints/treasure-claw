import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Quote, Tv, BookOpen, Radio, Star } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Card, CardContent } from '../components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "Awesome prices and I actually won some nice things I luv this place.",
    author: "Fin Austin",
    role: "Regular Player",
    rating: 5,
  },
  {
    quote: "Wonderful little slice of Japan right in Twin Falls! Ideal for a fun time with younger kids, since playing the machines will be as much fun as winning the prizes will be, so it's a win win for everyone!",
    author: "Colvegrant",
    role: "First-time Visitor",
    rating: 5,
  },
  {
    quote: "So much fun! The owners made the experience really special for our kids. Easy to play, lots of prizes, and yummy snacks to try! We'll definitely go back!",
    author: "Christiana Sipe-Pauley",
    role: "Family Visitor",
    rating: 5,
  },
  {
    quote: "Best arcade in Twin Falls hands down. The diamond trade-up system is genius — my kids are obsessed with saving up for the giant Stitch.",
    author: "Mike R.",
    role: "Parent",
    rating: 5,
  },
  {
    quote: "Great date night spot! We did BYOB night and had a blast. Staff is super friendly and the machines are actually winnable.",
    author: "Sarah & Jake",
    role: "Date Night",
    rating: 5,
  },
]

const media = [
  { name: 'KMVT Channel 11', icon: Tv },
  { name: 'Magic Valley Magazine', icon: BookOpen },
  { name: 'Sounds of the Scene', icon: Radio },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accent-pink/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-accent-teal/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headerRef} className="text-center mb-14">
          <Badge
            variant="outline"
            className="bg-accent-teal/10 border-accent-teal/40 text-accent-teal font-ui text-xs tracking-[0.14em] uppercase mb-4"
          >
            Reviews
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-6xl text-foreground leading-[0.95] mb-4">
            Player <span className="text-gradient-teal">Love</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-md mx-auto">
            Don't just take our word for it.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full mb-16"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="glass-card h-full border-0 hover:border-white/10 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={14} className="text-accent-pink fill-accent-pink" />
                      ))}
                    </div>
                    <Quote size={24} className="text-accent-pink/30 mb-3" />
                    <p className="font-body text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-card/80 border-border hover:bg-accent-pink/20 hover:border-accent-pink/40 hover:text-accent-pink" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-card/80 border-border hover:bg-accent-pink/20 hover:border-accent-pink/40 hover:text-accent-pink" />
          </div>
        </Carousel>

        {/* Media mentions */}
        <div className="text-center">
          <div className="section-glow-divider mb-8" />
          <p className="font-body text-muted-foreground text-sm mb-5 uppercase tracking-widest">
            Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {media.map((m, i) => (
              <div key={i} className="flex items-center gap-2.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                <m.icon size={16} className="text-accent-pink" />
                <span className="font-ui text-sm font-medium">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
