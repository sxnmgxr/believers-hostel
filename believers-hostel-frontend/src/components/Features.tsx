const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="1.2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Dedicated Study Rooms',
    description: 'Quiet, well-lit study halls available morning and evening so students can focus on academics without distractions.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="1.2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Supervised & Caring',
    description: 'Trained wardens and house parents provide 24/7 supervision, ensuring every student feels safe, guided, and supported.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="1.2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: 'Nutritious Meals',
    description: 'Three balanced home-cooked meals every day, planned by a nutritionist to keep students healthy and energised.',
  },
]

export default function Features() {
  return (
    <section id="amenities" className="bg-[#f4f4f2] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 text-center mb-3">Why choose us</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-center mb-10 sm:mb-14 md:mb-16">
          A hostel built for students
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 md:gap-16 text-center">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-5">{f.icon}</div>
              <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 font-light">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 md:mt-16">
          <a href="#about" className="inline-block bg-black text-white px-10 sm:px-14 py-3 sm:py-4 text-xs sm:text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
            Learn more
          </a>
        </div>
      </div>
    </section>
  )
}