import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Cake, Calendar, MapPin, Clock, Users } from 'lucide-react'

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
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo(card2Ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-bg-primary py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="font-ui text-accent-teal text-sm tracking-[0.14em] uppercase mb-4 block">
            Plan Your Visit
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-text-primary leading-[0.95]">
            Events & Parties
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Birthdays & Parties */}
          <div ref={card1Ref} id="parties">
            <div className="card-dark overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/party.jpg"
                  alt="Birthday party at arcade"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="pill-pink flex items-center gap-2">
                    <Cake size={14} />
                    Parties
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-2xl text-text-primary mb-3">
                  Birthdays & Parties
                </h3>
                <p className="font-body text-text-secondary text-sm mb-6">
                  Celebrate your birthday or special event at TreasureClaw with customizable party packages for exclusive arcade access.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <Users size={16} className="text-accent-pink" />
                    <span>Private arcade access for your group</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <MapPin size={16} className="text-accent-pink" />
                    <span>Behind Moxie Cafe, Canyon Springs</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <Clock size={16} className="text-accent-pink" />
                    <span>Flexible booking times available</span>
                  </div>
                </div>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary w-full justify-center"
                >
                  Plan a Party
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Events */}
          <div ref={card2Ref} id="events">
            <div className="card-dark overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/event-night.jpg"
                  alt="Weekly events"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="pill-teal flex items-center gap-2">
                    <Calendar size={14} />
                    Weekly Events
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-2xl text-text-primary mb-3">
                  Weekly Events
                </h3>
                <p className="font-body text-text-secondary text-sm mb-6">
                  Join us for exciting themed nights like BYOB competitions, Toddler Time mornings, and special events like Pokémon Day.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-bg-primary/50 rounded-lg p-3 text-center">
                    <span className="font-ui text-accent-teal text-xs uppercase tracking-wide">BYOB Night</span>
                  </div>
                  <div className="bg-bg-primary/50 rounded-lg p-3 text-center">
                    <span className="font-ui text-accent-pink text-xs uppercase tracking-wide">Toddler Time</span>
                  </div>
                  <div className="bg-bg-primary/50 rounded-lg p-3 text-center">
                    <span className="font-ui text-accent-teal text-xs uppercase tracking-wide">Pokémon Day</span>
                  </div>
                  <div className="bg-bg-primary/50 rounded-lg p-3 text-center">
                    <span className="font-ui text-accent-pink text-xs uppercase tracking-wide">Otaku Day</span>
                  </div>
                </div>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary w-full justify-center"
                >
                  See Event Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
