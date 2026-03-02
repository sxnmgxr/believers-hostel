import Link from 'next/link'

export default function MidCTA() {
  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[350px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80')` }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 text-white px-6 sm:px-12 md:px-20 lg:px-24 max-w-xs sm:max-w-xl md:max-w-2xl">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 sm:mb-8">
          Keep their growing<br />minds engaged
        </h2>
        <Link href="#book" className="inline-block bg-white text-blue-700 px-8 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm tracking-widest uppercase hover:bg-blue-100 transition-colors">
          Apply today
        </Link>
      </div>
    </section>
  )
}