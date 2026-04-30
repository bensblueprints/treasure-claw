import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

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
        scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none reverse' }
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
      className="bg-slate-900 text-slate-300"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Visit */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-4">Visit</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
                <p className="font-body text-sm">
                  Behind Moxie Cafe<br />
                  Canyon Springs Hotel<br />
                  Twin Falls, ID 83301
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-brand shrink-0 mt-0.5" />
                <p className="font-body text-sm">
                  Mon&ndash;Thu: 12PM&ndash;9PM<br />
                  Fri&ndash;Sat: 12PM&ndash;11PM<br />
                  Sun: 12PM&ndash;8PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:208-595-1109" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={18} className="text-brand shrink-0" />
                <span className="font-body text-sm">(208) 595-1109</span>
              </a>
              <a href="mailto:treasureclawllc@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={18} className="text-brand shrink-0" />
                <span className="font-body text-sm">treasureclawllc@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: 'Services', id: 'services' },
                { label: 'How It Works', id: 'how-it-works' },
                { label: 'About', id: 'about' },
                { label: 'Reviews', id: 'reviews' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block font-body text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-slate-500">
            &copy; {new Date().getFullYear()} TreasureClaw Arcade. All rights reserved.
          </p>
          <p className="font-body text-xs text-slate-500">
            Proud member of the Twin Falls Chamber of Commerce
          </p>
        </div>
      </div>
    </footer>
  )
}
