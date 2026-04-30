import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "Awesome prices and I actually won some nice things I luv this place.",
    author: "Fin Austin",
    image: "/party.jpg",
  },
  {
    quote: "Wonderful little slice of Japan right in Twin Falls! Ideal for a fun time with younger kids, since playing the machines will be as much fun as winning the prizes will be, so it's a win win for everyone! Have to come and give it a look for yourself. Behind (or around the left hand side) the Moxie Cafe by the Canyon Springs hotel.",
    author: "Colvegrant",
    image: "/event-night.jpg",
  },
  {
    quote: "So much fun! The owners made the experience really special for our kids. Easy to play, lots of prizes, and yummy snacks to try! We'll definitely go back!",
    author: "Christiana Sipe-Pauley",
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
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-slate-50" id="reviews">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Client Testimonials
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
            >
              <Quote size={24} className="text-brand/30 mb-4" />
              <p className="font-body text-foreground text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center overflow-hidden">
                  <img src={t.image} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="font-ui font-semibold text-foreground text-sm">{t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
