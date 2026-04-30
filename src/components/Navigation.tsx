import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section
      const sections = ['hero', 'services', 'how-it-works', 'about', 'reviews', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      setOpen(false)
    }
  }

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'About', id: 'about' },
    { label: 'Reviews', id: 'reviews' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-display font-bold text-xl tracking-tight text-foreground hover:text-brand transition-colors duration-300"
          >
            Treasure<span className="text-brand">Claw</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative font-ui text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-brand font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />
                )}
              </button>
            ))}
            <Button
              onClick={() => scrollTo('contact')}
              className="btn-premium ml-4 text-sm px-6 py-2.5 h-auto"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu size={22} strokeWidth={2} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
                  <SheetTitle className="font-display font-bold text-xl">
                    Treasure<span className="text-brand">Claw</span>
                  </SheetTitle>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className={`font-ui text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeSection === link.id
                          ? 'text-brand font-semibold bg-brand/[0.05]'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t border-border/60">
                  <Button
                    onClick={() => scrollTo('contact')}
                    className="btn-premium w-full text-sm"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
