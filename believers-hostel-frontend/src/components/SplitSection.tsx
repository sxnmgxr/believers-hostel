export default function SplitSection() {
  return (
    <section id="about" className="bg-[#f4f4f2] py-4">
      <div className="flex flex-col md:flex-row min-h-[480px]">
        <div className="flex-1 flex items-center px-12 md:px-20 py-16 bg-white">
          <div className="max-w-md">
            <h2 className="font-serif text-4xl md:text-5xl leading-snug mb-6">
              Spaces you can <span className="highlight-word">explore</span> together
            </h2>
            <p className="text-gray-600 font-light leading-relaxed text-base">
              Our hostel is a hub for shared experiences. From rooftop sunsets and communal kitchens to spontaneous city walks organised by our staff, there is always something happening.
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-[360px] md:min-h-0">
          <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&q=80" alt="Travellers in common room" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse min-h-[480px]">
        <div className="flex-1 flex items-center px-12 md:px-20 py-16 bg-[#f4f4f2]">
          <div className="max-w-md">
            <h2 className="font-serif text-4xl md:text-5xl leading-snug mb-6">
              Beds that feel like <span className="highlight-word">home</span>
            </h2>
            <p className="text-gray-600 font-light leading-relaxed text-base">
              Every bed comes with a personal locker, reading light, and power outlet. Our dorm rooms are designed for both privacy and social connection.
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-[360px] md:min-h-0">
          <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80" alt="Hostel dorm room" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}