import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Cake, Calendar, Package, Gem, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Cake,
    title: 'Birthday Parties',
    desc: 'Private party packages with exclusive arcade access, customizable themes, and dedicated staff to make every celebration unforgettable.',
    image: '/party.jpg',
    tag: 'Most Popular',
  },
  {
    icon: Calendar,
    title: 'Special Events',
    desc: 'Themed nights including BYOB competitions, Toddler Time mornings, Pokémon Day, and seasonal celebrations for all ages.',
    image: '/event-night.jpg',
    tag: null,
  },
  {
    icon: Package,
    title: 'Prize Inventory',
    desc: 'Rotating selection of anime, Disney, gaming collectibles, viral Asian snacks, and specialty ice creams you won\'t find locally.',
    image: '/portal-plush.jpg',
    tag: 'New Items Weekly',
  },
  {
    icon: Gem,
    title: 'Diamond Club',
    desc: 'Our exclusive insiders group. Earn diamonds for early prize access, join blind taste tests, and help shape future events.',
    image: '/prize-pit.jpg',
    tag: 'Elite',
  },
]

export default function ServicesSection() {
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
    <section ref={sectionRef} className="section-padding bg-white" id="services">
      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="section-overline">
            <span className="w-8 h-px bg-brand" />
            What We Offer
          </div>
          <h2 className="section-heading mb-5">
            Services Built for Fun
          </h2>
          <p className="section-subtext">
            From private parties to exclusive memberships, we've crafted experiences 
            that bring families and friends together for unforgettable moments.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="card-premium group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Tag */}
                {service.tag && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand font-ui text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                    {service.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand/[0.08] flex items-center justify-center">
                    <service.icon size={18} className="text-brand" strokeWidth={2} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-foreground tracking-wide uppercase">
                    {service.title}
                  </h4>
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <div className="flex items-center gap-1 text-brand font-ui text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1 group-hover:translate-x-0">
                  Learn more
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            className="btn-outline-premium"
          >
            View all services
            <ArrowRight size={16} className="ml-1.5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
