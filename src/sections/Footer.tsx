import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const footer = footerRef.current
    if (!footer) return

    gsap.fromTo(footer,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, { scope: footerRef })

  return (
    <footer
      ref={footerRef}
      className="relative z-[70] bg-bg-secondary border-t border-white/[0.08]"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Visit */}
          <div>
            <h4 className="font-ui font-bold text-text-primary text-lg mb-4">Visit</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-pink shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-text-secondary text-sm">
                    Behind Moxie Cafe<br />
                    Canyon Springs Hotel<br />
                    Twin Falls, ID 83301
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent-pink shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-text-secondary text-sm">
                    Mon–Thu: 12PM–9PM<br />
                    Fri–Sat: 12PM–11PM<br />
                    Sun: 12PM–8PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui font-bold text-text-primary text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:208-595-1109"
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Phone size={18} className="text-accent-teal shrink-0" />
                <span className="font-body text-sm">(208) 595-1109</span>
              </a>
              <a
                href="mailto:treasureclawllc@gmail.com"
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Mail size={18} className="text-accent-teal shrink-0" />
                <span className="font-body text-sm">treasureclawllc@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-text-secondary hover:text-accent-pink transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-pink transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-pink transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ui font-bold text-text-primary text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="block font-body text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                How It Works
              </button>
              <button
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                className="block font-body text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                Events
              </button>
              <button
                onClick={() => document.getElementById('parties')?.scrollIntoView({ behavior: 'smooth' })}
                className="block font-body text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                Parties
              </button>
              <button
                onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })}
                className="block font-body text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-text-secondary text-xs">
            &copy; {new Date().getFullYear()} TreasureClaw Arcade. All rights reserved.
          </p>
          <p className="font-body text-text-secondary text-xs">
            Proud member of the Twin Falls Chamber of Commerce
          </p>
        </div>
      </div>
    </footer>
  )
}
