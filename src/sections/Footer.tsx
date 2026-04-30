import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Gamepad2, ArrowUpRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const footer = footerRef.current
    if (!footer) return

    gsap.fromTo(footer,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: footerRef })

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Events', id: 'events' },
    { label: 'Parties', id: 'parties' },
    { label: 'Inventory', id: 'prizes' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative z-[70] border-t border-border/40"
      id="contact"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-pink/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={() => scrollTo('hero')}
              className="font-display font-black text-2xl tracking-tight text-foreground flex items-center gap-2 mb-4 hover:text-accent-pink transition-colors"
            >
              <Gamepad2 className="h-6 w-6 text-accent-pink" />
              Treasure<span className="text-accent-pink">Claw</span>
            </button>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
              Twin Falls' premier claw-machine arcade. Play, win, and upgrade your prizes.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 text-muted-foreground hover:text-accent-pink hover:bg-accent-pink/10">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 text-muted-foreground hover:text-accent-pink hover:bg-accent-pink/10">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 text-muted-foreground hover:text-accent-pink hover:bg-accent-pink/10">
                <Youtube size={18} />
              </Button>
            </div>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-ui font-bold text-foreground text-sm uppercase tracking-wider mb-5">Visit</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-pink shrink-0 mt-0.5" />
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  Behind Moxie Cafe<br />
                  Canyon Springs Hotel<br />
                  Twin Falls, ID 83301
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent-pink shrink-0 mt-0.5" />
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  Mon&ndash;Thu: 12PM&ndash;9PM<br />
                  Fri&ndash;Sat: 12PM&ndash;11PM<br />
                  Sun: 12PM&ndash;8PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui font-bold text-foreground text-sm uppercase tracking-wider mb-5">Contact</h4>
            <div className="space-y-4">
              <a
                href="tel:208-595-1109"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Phone size={18} className="text-accent-teal shrink-0" />
                <span className="font-body text-sm">(208) 595-1109</span>
              </a>
              <a
                href="mailto:treasureclawllc@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail size={18} className="text-accent-teal shrink-0" />
                <span className="font-body text-sm">treasureclawllc@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ui font-bold text-foreground text-sm uppercase tracking-wider mb-5">Links</h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center gap-1 font-body text-muted-foreground hover:text-foreground transition-colors text-sm group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-pink" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-border/40 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-muted-foreground/60 text-xs">
            &copy; {new Date().getFullYear()} TreasureClaw Arcade. All rights reserved.
          </p>
          <p className="font-body text-muted-foreground/60 text-xs">
            Proud member of the Twin Falls Chamber of Commerce
          </p>
        </div>
      </div>
    </footer>
  )
}
