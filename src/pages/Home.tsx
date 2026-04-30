import Navigation from '../components/Navigation'
import HeroScene from '../sections/HeroScene'
import ServicesSection from '../sections/ServicesSection'
import FeaturePanel from '../sections/FeaturePanel'
import AboutSection from '../sections/AboutSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import GuaranteeSection from '../sections/GuaranteeSection'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroScene />
      <ServicesSection />
      <FeaturePanel />
      <AboutSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <Footer />
    </main>
  )
}
