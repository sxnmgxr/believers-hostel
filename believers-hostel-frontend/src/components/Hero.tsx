import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1800&q=80')` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4 sm:px-8 md:px-12 max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase font-light mb-4 sm:mb-6 opacity-80">
          Gokarneshwor-7, Kathmandu
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 sm:mb-6">
          Welcome to<br />Believers Hostel
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-light opacity-80 mb-8 sm:mb-10">
          A nurturing, disciplined, and caring home for students
        </p>
        <Link href="#book" className="inline-block bg-white text-blue-700 px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-widest uppercase border border-white hover:bg-blue-100 transition-colors">
          Apply for Admission
        </Link>
      </div>
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white opacity-60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-6 sm:h-8 bg-white animate-pulse" />
      </div>
    </section>
  )
}