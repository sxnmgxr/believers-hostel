const testimonials = [
  {
    text: 'Believers Hostel gave my son a second home. The wardens are caring, the meals are great, and his grades have improved tremendously.',
    name: 'Mrs. Sharma',
    from: 'Parent, Grade 10',
  },
  {
    text: 'The study environment here is unlike any other hostel. I passed my SEE with distinction and I owe a lot to the discipline here.',
    name: 'Aarav Thapa',
    from: 'Student, Class 10',
  },
  {
    text: 'As a parent living far from the city, I feel completely at peace knowing my daughter is safe, well-fed, and guided at Believers.',
    name: 'Mr. Gurung',
    from: 'Parent, Grade 8',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#f4f4f2]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 text-center mb-3">What they say</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-center mb-10 sm:mb-14 md:mb-16">
          Words from our community
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-sm">
              <p className="font-serif text-3xl text-blue-400 mb-3 sm:mb-4">"</p>
              <p className="text-gray-700 font-light leading-relaxed text-sm mb-5 sm:mb-6">{t.text}</p>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.from}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}