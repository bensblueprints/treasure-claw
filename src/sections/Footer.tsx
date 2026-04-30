import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Gamepad2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { Card, CardContent } from '../components/ui/card'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const footer = footerRef.current
    if (!footer) return

    gsap.fromTo(footer,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: footerRef })

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      className="relative z-[70] bg-card/30 border-t border-border"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Visit */}
          <Card className="bg-transparent border-0 shadow-none">
            <CardContent className="p-0">
              <h4 className="font-ui font-bold text-foreground text-lg mb-4">Visit</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-muted-foreground text-sm">
                      Behind Moxie Cafe<br />
                      Canyon Springs Hotel<br />
                      Twin Falls, ID 83301
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-accent-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-muted-foreground text-sm">
                      Mon&ndash;Thu: 12PM&ndash;9PM<br />
                      Fri&ndash;Sat: 12PM&ndash;11PM<br />
                      Sun: 12PM&ndash;8PM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-transparent border-0 shadow-none">
            <CardContent className="p-0">
              <h4 className="font-ui font-bold text-foreground text-lg mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href="tel:208-595-1109"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={18} className="text-accent-teal shrink-0" />
                  <span className="font-body text-sm">(208) 595-1109</span>
                </a>
                <a
                  href="mailto:treasureclawllc@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={18} className="text-accent-teal shrink-0" />
                  <span className="font-body text-sm">treasureclawllc@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent-pink hover:bg-accent-pink/10">
                    <Instagram size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent-pink hover:bg-accent-pink/10">
                    <Facebook size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent-pink hover:bg-accent-pink/10">
                    <Youtube size={20} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="bg-transparent border-0 shadow-none">
            <CardContent className="p-0">
              <h4 className="font-ui font-bold text-foreground text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: 'How It Works', id: 'how-it-works' },
                  { label: 'Events', id: 'events' },
                  { label: 'Parties', id: 'parties' },
                  { label: 'Inventory', id: 'prizes' },
                ].map((link) => (
                  <Button
                    key={link.id}
                    variant="ghost"
                    onClick={() => scrollTo(link.id)}
                    className="block font-body text-muted-foreground hover:text-foreground hover:bg-accent/10 text-sm justify-start p-0 h-auto"
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12 bg-border/60" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-accent-pink" />
            <p className="font-body text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} TreasureClaw Arcade. All rights reserved.
            </p>
          </div>
          <p className="font-body text-muted-foreground text-xs">
            Proud member of the Twin Falls Chamber of Commerce
          </p>
        </div>
      </div>
    </footer>
  )
}
