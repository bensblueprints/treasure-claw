import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Quote } from 'lucide-react'

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

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-bg-primary py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="font-ui text-accent-teal text-sm tracking-[0.14em] uppercase mb-4 block">
            Reviews
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-text-primary leading-[0.95]">
            Player Love
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card-dark p-6 relative"
            >
              <Quote size={24} className="text-accent-pink/40 mb-4" />
              <p className="font-body text-text-secondary text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-pink to-accent-teal flex items-center justify-center">
                  <span className="font-ui font-bold text-bg-primary text-sm">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-ui font-semibold text-text-primary text-sm">{t.author}</p>
                  <p className="font-body text-text-secondary text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media mentions */}
        <div className="mt-12 text-center">
          <p className="font-body text-text-secondary text-sm mb-4">
            Featured in:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="font-ui text-text-secondary/60 text-sm">KMVT Channel 11</span>
            <span className="text-accent-pink">&bull;</span>
            <span className="font-ui text-text-secondary/60 text-sm">Magic Valley Magazine</span>
            <span className="text-accent-pink">&bull;</span>
            <span className="font-ui text-text-secondary/60 text-sm">Sounds of the Scene</span>
          </div>
        </div>
      </div>
    </section>
  )
}
