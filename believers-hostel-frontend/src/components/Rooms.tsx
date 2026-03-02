const rooms = [
  {
    name: 'Boys Dormitory',
    capacity: '6-Bed',
    price: 'NPR 4,500',
    period: 'per month',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    features: ['Personal locker', 'Study desk', 'Free WiFi', 'Linen provided'],
  },
  {
    name: 'Girls Dormitory',
    capacity: '4-Bed',
    price: 'NPR 5,000',
    period: 'per month',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    features: ['Personal locker', 'Study desk', 'Free WiFi', 'Linen provided'],
  },
  {
    name: 'Single Room',
    capacity: 'Private',
    price: 'NPR 8,500',
    period: 'per month',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    features: ['Attached bathroom', 'Study desk', 'Free WiFi', 'Linen provided'],
  },
]

export default function Rooms() {
  return (
    <section id="rooms" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 text-center mb-3">Accommodation</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-center mb-10 sm:mb-14 md:mb-16">
          Choose your room
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {rooms.map((room, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden mb-4 sm:mb-5">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{room.capacity}</p>
                  <h3 className="font-serif text-lg sm:text-xl">{room.name}</h3>
                </div>
                <div className="text-right">
                  <p className="font-serif text-lg sm:text-xl">{room.price}</p>
                  <p className="text-xs text-gray-400">{room.period}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {room.features.map((f, j) => (
                  <li key={j} className="text-xs sm:text-sm text-gray-500 font-light flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-400 inline-block shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#book" className="mt-4 sm:mt-5 inline-block bg-white text-blue-700 px-6 sm:px-8 py-2.5 sm:py-3 text-xs tracking-widest uppercase border border-gray-200 hover:bg-blue-100 transition-colors">
                Apply now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}