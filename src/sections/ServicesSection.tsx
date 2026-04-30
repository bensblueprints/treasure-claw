import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Cake, Calendar, Package, Gem } from 'lucide-react'
import { Button } from '../components/ui/button'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Cake,
    title: 'PARTIES',
    desc: 'Celebrate your birthday or special event at TreasureClaw with customizable party packages for exclusive arcade access.',
    image: '/party.jpg',
  },
  {
    icon: Calendar,
    title: 'UP COMING EVENTS',
    desc: 'Join us for exciting themed nights like BYOB competitions, Toddler Time mornings, and special events like Pokémon Day.',
    image: '/event-night.jpg',
  },
  {
    icon: Package,
    title: 'INVENTORY',
    desc: 'We stock rotating anime, Disney, gaming, and collectible items along with viral Asian snacks and specialty ice creams, with new items added regularly to keep every visit fresh.',
    image: '/portal-plush.jpg',
  },
  {
    icon: Gem,
    title: 'DIAMOND CLUB',
    desc: 'An insider group where top players earn diamonds to unlock early access to new prizes, join blind taste tests and reaction videos on YouTube, and help choose future merch and event themes at TreasureClaw.',
    image: '/prize-pit.jpg',
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
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-white" id="services">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Our Services
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            This text briefly introduces your main services to your visitors.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <service.icon size={18} className="text-brand" />
                  <h4 className="font-display font-bold text-sm text-foreground tracking-wide">
                    {service.title}
                  </h4>
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            className="border-brand text-brand hover:bg-brand hover:text-white font-ui"
          >
            View all services
          </Button>
        </div>
      </div>
    </section>
  )
}
