import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShieldCheck, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  'Valid on 2 or more machines',
  'Excludes MeDolls machine',
  'One plush or keychain guaranteed',
]

export default function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(contentRef.current,
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding-sm bg-white">
      <div className="container-custom">
        <div
          ref={contentRef}
          className="relative max-w-4xl mx-auto bg-gradient-to-br from-brand-light to-white rounded-[2rem] p-10 md:p-14 border border-brand/10 overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.04] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/[0.04] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Icon */}
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-brand/[0.10] flex items-center justify-center">
              <ShieldCheck size={36} className="text-brand" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <div className="section-overline justify-center md:justify-start mb-3">
                <span className="w-6 h-px bg-brand" />
                Our Promise
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                The $10 Guarantee
              </h2>
              <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                We guarantee at least one plush toy or keychain with the investment of $10.00 
                when played on 2 or more machines.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-brand shrink-0" strokeWidth={2.5} />
                    <span className="font-body text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
