import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '../components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-white" id="about">
      <div className="container-custom">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/platform.jpg"
              alt="TreasureClaw arcade"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
              About Our Company
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                TreasureClaw is a family-friendly Japanese claw machine arcade in Twin Falls, Idaho, where guests can play, win, and upgrade their prizes. We offer anime, Disney, gaming, and collectible plush, keychains, viral Asian snacks, and specialty ice creams you won't find anywhere else locally.
              </p>
              <p>
                Built from a passion for fun, fairness, and community, we've created a space where kids, teens, and adults can compete, celebrate, and make memories together. Whether you're here for a quick game, a themed event, a birthday party, or just the snacks, TreasureClaw is designed to deliver excitement on every visit.
              </p>
              <p>
                Proud members of the Twin Falls Chamber of Commerce! We have been mentioned in KMVT Channel 11, Magic Valley Magazine, & Magic Valley Sounds of the Scene.
              </p>
            </div>
            <Button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="mt-8 border-brand text-brand hover:bg-brand hover:text-white font-ui"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
