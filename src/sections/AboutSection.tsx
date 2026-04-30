import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '../components/ui/button'
import { Award, Newspaper, Users } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '20+', label: 'Claw Machines', icon: Users },
  { value: '3+', label: 'Years Running', icon: Award },
  { value: '4.9', label: 'Google Rating', icon: Newspaper },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )

    gsap.fromTo(statsRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-white" id="about">
      <div className="container-custom">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 ring-1 ring-black/5">
              <img
                src="/platform.jpg"
                alt="TreasureClaw arcade interior"
                className="w-full h-[400px] lg:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating stat */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white rounded-2xl shadow-xl shadow-black/5 p-5 border border-border/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/[0.08] flex items-center justify-center">
                  <Award size={24} className="text-brand" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground text-lg leading-none">Chamber Member</p>
                  <p className="font-body text-muted-foreground text-sm mt-1">Twin Falls Chamber of Commerce</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div>
            <div className="section-overline">
              <span className="w-8 h-px bg-brand" />
              About Us
            </div>
            <h2 className="section-heading mb-6">
              Where Fun Meets Community
            </h2>
            <div className="space-y-5 font-body text-muted-foreground leading-[1.75] text-base">
              <p>
                TreasureClaw is a family-friendly Japanese claw machine arcade in the heart of 
                Twin Falls, Idaho. We've created a space where guests of all ages can play, win, 
                and upgrade their prizes in an atmosphere built on fairness and excitement.
              </p>
              <p>
                Our inventory features rotating anime, Disney, and gaming collectibles alongside 
                viral Asian snacks and specialty ice creams you simply won't find anywhere else 
                in the Magic Valley.
              </p>
              <p>
                Built from a passion for fun and community, we've been mentioned in{' '}
                <span className="text-foreground font-medium">KMVT Channel 11</span>,{' '}
                <span className="text-foreground font-medium">Magic Valley Magazine</span>, and{' '}
                <span className="text-foreground font-medium">Sounds of the Scene</span>.
              </p>
            </div>

            <Button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="btn-outline-premium mt-8"
            >
              Our Story
              <ArrowRight size={16} className="ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24 pt-16 border-t border-border/50">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand/[0.08] flex items-center justify-center shrink-0">
                <stat.icon size={24} className="text-brand" strokeWidth={2} />
              </div>
              <div>
                <p className="font-display font-bold text-3xl text-foreground leading-none">{stat.value}</p>
                <p className="font-body text-muted-foreground text-sm mt-1.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
