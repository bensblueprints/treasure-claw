import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HelpCircle } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: 'How much do tokens cost?',
    answer: 'Tokens are $1 each, with bulk discounts: 10 for $9, 25 for $20 (that\'s $0.80 per token). We also run special promotions where you can earn bonus tokens.',
  },
  {
    question: 'What is the TreasureClaw Guarantee?',
    answer: 'We guarantee at least one plush toy or keychain with $10 played on 2 or more machines (excluding MeDolls). If you don\'t win, talk to our staff and we\'ll make it right.',
  },
  {
    question: 'How does the diamond system work?',
    answer: 'Every plush you win has a hidden diamond value (1–3 diamonds). Collect diamonds over multiple visits and trade them in for big-ticket items like PlayStations, giant plushes, and exclusive collectibles.',
  },
  {
    question: 'Can I book a private party?',
    answer: 'Absolutely! We offer customizable party packages with private arcade access. Perfect for birthdays, team celebrations, and group events. Contact us to plan your party.',
  },
  {
    question: 'What are your hours?',
    answer: 'Monday–Thursday: 12PM–9PM, Friday–Saturday: 12PM–11PM, Sunday: 12PM–8PM. We\'re located behind Moxie Cafe at the Canyon Springs Hotel in Twin Falls.',
  },
  {
    question: 'Do you host weekly events?',
    answer: 'Yes! We have BYOB Night (Bring Your Own Bucket), Toddler Time mornings, Pokémon Day, and Otaku Day. Check our event calendar or follow us on social media for upcoming dates.',
  },
]

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-background py-24 md:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="bg-accent-pink/10 border-accent-pink/40 text-accent-pink font-ui text-xs tracking-[0.14em] uppercase mb-4"
          >
            FAQ
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-[0.95] mb-4">
            Got <span className="text-gradient-pink">Questions?</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Everything you need to know before your first visit.
          </p>
        </div>

        <div ref={contentRef}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card border-0 px-6 data-[state=open]:border-white/10 transition-colors"
              >
                <AccordionTrigger className="font-ui font-semibold text-foreground text-sm md:text-base hover:no-underline py-5">
                  <div className="flex items-center gap-3 text-left">
                    <HelpCircle size={18} className="text-accent-pink shrink-0" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground text-sm leading-relaxed pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
