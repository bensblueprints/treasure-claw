import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from '../components/Navigation'
import HeroScene from '../sections/HeroScene'
import ClawDescendScene from '../sections/ClawDescendScene'
import PrizePitScene from '../sections/PrizePitScene'
import WinFlashScene from '../sections/WinFlashScene'
import SkylineTravelScene from '../sections/SkylineTravelScene'
import TouchdownScene from '../sections/TouchdownScene'
import StatsSection from '../sections/StatsSection'
import FeaturePanel from '../sections/FeaturePanel'
import PrizesSection from '../sections/PrizesSection'
import EventsSection from '../sections/EventsSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import FAQSection from '../sections/FAQSection'
import Footer from '../sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start)

      const maxScroll = ScrollTrigger.maxScroll(window)
      if (!maxScroll || pinned.length === 0) return

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }))

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            )
            if (!inPinned) return value

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            )
            return target
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <main className="relative">
      <Navigation />
      <HeroScene />
      <ClawDescendScene />
      <PrizePitScene />
      <WinFlashScene />
      <SkylineTravelScene />
      <TouchdownScene />
      <StatsSection />
      <FeaturePanel />
      <PrizesSection />
      <EventsSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <div className="grain-overlay" />
    </main>
  )
}
