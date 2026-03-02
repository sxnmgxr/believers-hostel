import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import MidCTA from '@/components/MidCTA'
import SplitSection from '@/components/SplitSection'
import Rooms from '@/components/Rooms'
import Testimonials from '@/components/Testimonials'
import BookingContact from '@/components/BookingContact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Rooms />
      <MidCTA />
      <SplitSection />
      <Testimonials />
      <BookingContact />
      <Footer />
    </main>
  )
}