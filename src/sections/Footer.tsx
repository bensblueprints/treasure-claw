import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const footer = footerRef.current
    if (!footer) return

    gsap.fromTo(footer.querySelectorAll('.footer-col'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none reverse' }
      }
    )
  }, { scope: footerRef })

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { label: 'Services', id: 'services' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'About', id: 'about' },
    { label: 'Reviews', id: 'reviews' },
  ]

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ]

  return (
    <footer
      ref={footerRef}
      className="bg-slate-950 text-slate-400"
      id="contact"
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="footer-col md:col-span-4">
            <button
              onClick={() => scrollTo('hero')}
              className="font-display font-bold text-2xl text-white hover:text-brand transition-colors duration-300 mb-5 inline-block"
            >
              Treasure<span className="text-brand">Claw</span>
            </button>
            <p className="font-body text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              Twin Falls' premier claw machine arcade. Play, win, and upgrade prizes 
              in a family-friendly atmosphere.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand/20 transition-all duration-300"
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Visit column */}
          <div className="footer-col md:col-span-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">
              Visit
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-brand shrink-0 mt-0.5" strokeWidth={2} />
                <p className="font-body text-sm leading-relaxed">
                  Behind Moxie Cafe<br />
                  Canyon Springs Hotel<br />
                  Twin Falls, ID 83301
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-brand shrink-0 mt-0.5" strokeWidth={2} />
                <div className="font-body text-sm leading-relaxed">
                  <p>Mon–Thu: 12PM–9PM</p>
                  <p>Fri–Sat: 12PM–11PM</p>
                  <p>Sun: 12PM–8PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact column */}
          <div className="footer-col md:col-span-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <a 
                href="tel:208-595-1109" 
                className="flex items-center gap-3 hover:text-white transition-colors duration-300 group"
              >
                <Phone size={16} className="text-brand shrink-0" strokeWidth={2} />
                <span className="font-body text-sm">(208) 595-1109</span>
              </a>
              <a 
                href="mailto:treasureclawllc@gmail.com" 
                className="flex items-center gap-3 hover:text-white transition-colors duration-300 group"
              >
                <Mail size={16} className="text-brand shrink-0" strokeWidth={2} />
                <span className="font-body text-sm">treasureclawllc@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links column */}
          <div className="footer-col md:col-span-2">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center gap-1.5 font-body text-sm text-slate-400 hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
