import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Cake, Calendar, MapPin, Clock, Users, PartyPopper, Baby, Gamepad2, Sparkles, Ticket } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

gsap.registerPlugin(ScrollTrigger)

const partyFeatures = [
  { icon: Users, text: 'Private arcade access for your group' },
  { icon: MapPin, text: 'Behind Moxie Cafe, Canyon Springs' },
  { icon: Clock, text: 'Flexible booking times available' },
  { icon: Ticket, text: 'Customizable party packages' },
]

const weeklyEvents = [
  { label: 'BYOB Night', icon: PartyPopper, desc: 'Bring your own bucket competition every Thursday', color: 'teal' as const },
  { label: 'Toddler Time', icon: Baby, desc: 'Special morning sessions for little ones', color: 'pink' as const },
  { label: 'Pokémon Day', icon: Gamepad2, desc: 'Themed competitions and exclusive prizes', color: 'teal' as const },
  { label: 'Otaku Day', icon: Sparkles, desc: 'Anime-themed events with rare plushes', color: 'pink' as const },
]

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-teal/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="bg-accent-teal/10 border-accent-teal/40 text-accent-teal font-ui text-xs tracking-[0.14em] uppercase mb-4"
          >
            Plan Your Visit
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-6xl text-foreground leading-[0.95] mb-4">
            Events & <span className="text-gradient-teal">Parties</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-md mx-auto">
            Something exciting happens every day at TreasureClaw.
          </p>
        </div>

        <div ref={contentRef}>
          <Tabs defaultValue="parties" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 bg-card/50 border border-border/60 p-1">
              <TabsTrigger value="parties" className="font-ui data-[state=active]:bg-accent-pink data-[state=active]:text-background gap-2">
                <Cake size={16} />
                Parties
              </TabsTrigger>
              <TabsTrigger value="events" className="font-ui data-[state=active]:bg-accent-teal data-[state=active]:text-background gap-2">
                <Calendar size={16} />
                Weekly Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="parties" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] ring-1 ring-white/10 group">
                  <img
                    src="/party.jpg"
                    alt="Birthday party at arcade"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <Badge className="bg-accent-pink text-background font-ui border-0">
                      <Cake size={14} className="mr-1.5" />
                      Book Now
                    </Badge>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">
                    Birthdays & Private Parties
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Celebrate your special day with exclusive arcade access. Our party packages include reserved machine time, a dedicated host, and custom prize bundles.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {partyFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent-pink/10 flex items-center justify-center shrink-0">
                          <f.icon size={16} className="text-accent-pink" />
                        </div>
                        <span className="font-body text-sm text-foreground">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-glow-pink"
                  >
                    Plan a Party
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 order-2 md:order-1">
                  <h3 className="font-display font-bold text-3xl text-foreground">
                    Weekly Themed Events
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    From competitive BYOB nights to family-friendly Toddler Time, there's always something happening at TreasureClaw.
                  </p>
                  <div className="space-y-3">
                    {weeklyEvents.map((evt, i) => (
                      <div
                        key={i}
                        className="glass-card p-4 flex items-center gap-4 group hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          evt.color === 'teal' ? 'bg-accent-teal/15 text-accent-teal' : 'bg-accent-pink/15 text-accent-pink'
                        }`}>
                          <evt.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-ui font-semibold text-foreground text-sm">{evt.label}</p>
                          <p className="font-body text-muted-foreground text-xs">{evt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="outline"
                    className="btn-glow-teal"
                  >
                    View Full Calendar
                  </Button>
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] ring-1 ring-white/10 group order-1 md:order-2">
                  <img
                    src="/event-night.jpg"
                    alt="Weekly events"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <Badge className="bg-accent-teal text-background font-ui border-0">
                      <Calendar size={14} className="mr-1.5" />
                      Every Week
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
