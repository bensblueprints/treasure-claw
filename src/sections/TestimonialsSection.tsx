import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "Awesome prices and I actually won some nice things. I luv this place!",
    author: "Fin Austin",
    role: "Google Review",
    rating: 5,
    image: "/party.jpg",
  },
  {
    quote: "Wonderful little slice of Japan right in Twin Falls! Ideal for a fun time with younger kids. Playing the machines is as much fun as winning the prizes — it's a win win for everyone!",
    author: "Colvegrant",
    role: "Google Review",
    rating: 5,
    image: "/event-night.jpg",
  },
  {
    quote: "So much fun! The owners made the experience really special for our kids. Easy to play, lots of prizes, and yummy snacks to try! We'll definitely go back!",
    author: "Christiana Sipe-Pauley",
    role: "Google Review",
    rating: 5,
    image: "/portal-plush.jpg",
  },
]

export default function TestimonialsSection() {
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
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-warm" id="reviews">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-overline justify-center">
            <span className="w-8 h-px bg-brand" />
            Testimonials
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="section-heading mb-5">
            Loved by the Community
          </h2>
          <p className="section-subtext mx-auto">
            Don't just take our word for it. Here's what our guests are saying 
            about their TreasureClaw experience.
          </p>
        </div>

        {/* Testimonial cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-7 lg:p-8 border border-border/50 group"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.02)' }}
            >
              {/* Quote icon */}
              <Quote size={32} className="text-brand/10 mb-5" strokeWidth={1.5} />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    size={15}
                    className={si < t.rating ? 'star-filled' : 'star-empty'}
                    fill={si < t.rating ? '#E87722' : '#E5E7EB'}
                    strokeWidth={0}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-body text-foreground text-[15px] leading-[1.7] mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-border/40">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand/10">
                  <img src={t.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-ui font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="font-body text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
