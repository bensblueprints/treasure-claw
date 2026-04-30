import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="font-display font-black text-xl tracking-tight text-text-primary"
        >
          Treasure<span className="text-accent-pink">Claw</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo('how-it-works')}
            className="font-ui text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('events')}
            className="font-ui text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Events
          </button>
          <button
            onClick={() => scrollTo('parties')}
            className="font-ui text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Parties
          </button>
          <button
            onClick={() => scrollTo('prizes')}
            className="font-ui text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Prizes
          </button>
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('contact')}
            className="btn-secondary text-sm py-2 px-4"
          >
            Book Now
          </button>
        </div>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-lg border-t border-white/5">
          <div className="flex flex-col p-6 gap-4">
            <button onClick={() => scrollTo('how-it-works')} className="font-ui text-text-secondary hover:text-text-primary text-left">How It Works</button>
            <button onClick={() => scrollTo('events')} className="font-ui text-text-secondary hover:text-text-primary text-left">Events</button>
            <button onClick={() => scrollTo('parties')} className="font-ui text-text-secondary hover:text-text-primary text-left">Parties</button>
            <button onClick={() => scrollTo('prizes')} className="font-ui text-text-secondary hover:text-text-primary text-left">Prizes</button>
            <button onClick={() => scrollTo('contact')} className="btn-secondary text-center mt-2">Book Now</button>
          </div>
        </div>
      )}
    </nav>
  )
}
