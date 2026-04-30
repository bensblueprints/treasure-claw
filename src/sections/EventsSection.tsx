import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Cake, Calendar, MapPin, Clock, Users, PartyPopper, Baby, Gamepad2, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(card1Ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )

    gsap.fromTo(card2Ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )

  }, { scope: sectionRef })

  const eventTags = [
    { label: 'BYOB Night', icon: PartyPopper, color: 'teal' as const },
    { label: 'Toddler Time', icon: Baby, color: 'pink' as const },
    { label: 'Pokémon Day', icon: Gamepad2, color: 'teal' as const },
    { label: 'Otaku Day', icon: Sparkles, color: 'pink' as const },
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
            Plan Your Visit
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-[0.95]">
            Events & Parties
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Birthdays & Parties */}
          <div ref={card1Ref} id="parties">
            <Card className="bg-card/50 border-border/60 overflow-hidden group hover:border-accent-pink/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/party.jpg"
                  alt="Birthday party at arcade"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="outline"
                    className="bg-accent-pink/10 border-accent-pink/40 text-accent-pink font-ui flex items-center gap-1.5"
                  >
                    <Cake size={14} />
                    Parties
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                  Birthdays & Parties
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-6">
                  Celebrate your birthday or special event at TreasureClaw with customizable party packages for exclusive arcade access.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Users size={16} className="text-accent-pink shrink-0" />
                    <span>Private arcade access for your group</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <MapPin size={16} className="text-accent-pink shrink-0" />
                    <span>Behind Moxie Cafe, Canyon Springs</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Clock size={16} className="text-accent-pink shrink-0" />
                    <span>Flexible booking times available</span>
                  </div>
                </div>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-accent-pink text-background hover:bg-accent-pink/90 font-ui font-semibold"
                >
                  Plan a Party
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Events */}
          <div ref={card2Ref} id="events">
            <Card className="bg-card/50 border-border/60 overflow-hidden group hover:border-accent-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/event-night.jpg"
                  alt="Weekly events"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="outline"
                    className="bg-accent-teal/10 border-accent-teal/40 text-accent-teal font-ui flex items-center gap-1.5"
                  >
                    <Calendar size={14} />
                    Weekly Events
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                  Weekly Events
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-6">
                  Join us for exciting themed nights like BYOB competitions, Toddler Time mornings, and special events like Pokémon Day.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {eventTags.map((tag, i) => (
                    <div
                      key={i}
                      className={`rounded-lg p-3 text-center flex items-center justify-center gap-2 ${
                        tag.color === 'teal'
                          ? 'bg-accent-teal/10 text-accent-teal'
                          : 'bg-accent-pink/10 text-accent-pink'
                      }`}
                    >
                      <tag.icon size={14} />
                      <span className="font-ui text-xs uppercase tracking-wide">{tag.label}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  className="w-full border-accent-teal text-accent-teal hover:bg-accent-teal/10 hover:text-foreground font-ui font-semibold"
                >
                  See Event Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
