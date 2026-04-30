import { useState, useEffect } from 'react'
import { Menu, Gamepad2 } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Events', id: 'events' },
    { label: 'Prizes', id: 'prizes' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-background/70 backdrop-blur-2xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => scrollTo('hero')}
          className="font-display font-black text-xl tracking-tight text-foreground hover:text-accent-pink hover:bg-transparent p-0 h-auto"
        >
          <Gamepad2 className="mr-2 h-5 w-5 text-accent-pink" />
          Treasure<span className="text-accent-pink">Claw</span>
        </Button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              onClick={() => scrollTo(link.id)}
              className="font-ui text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              {link.label}
            </Button>
          ))}
          <Button
            onClick={() => scrollTo('contact')}
            className="ml-4 font-ui text-sm bg-accent-pink text-background hover:bg-accent-pink/90 shadow-[0_0_15px_rgba(255,58,140,0.3)] hover:shadow-[0_0_25px_rgba(255,58,140,0.5)] transition-all"
          >
            Book Now
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-white/5">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-2xl border-border">
            <SheetTitle className="font-display font-black text-xl tracking-tight text-foreground flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-accent-pink" />
              Treasure<span className="text-accent-pink">Claw</span>
            </SheetTitle>
            <div className="flex flex-col gap-2 mt-8">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="ghost"
                  onClick={() => scrollTo(link.id)}
                  className="justify-start font-ui text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  {link.label}
                </Button>
              ))}
              <Button
                onClick={() => scrollTo('contact')}
                className="mt-4 font-ui bg-accent-pink text-background hover:bg-accent-pink/90"
              >
                Book Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
