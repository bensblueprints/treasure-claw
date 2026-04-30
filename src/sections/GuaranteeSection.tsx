import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container-custom">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto bg-brand-light rounded-2xl p-8 md:p-10 border border-brand/10 text-center"
        >
          <Shield size={40} className="text-brand mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
            Our Guarantee
          </h2>
          <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            We guarantee at least one plush toy, or key chain with the investment of $10.00 if played on 2 or more machines excluding the MEDOLLS MACHINE.
          </p>
        </div>
      </div>
    </section>
  )
}
