'use client'

import { useState } from 'react'

export default function BookingContact() {
  const [form, setForm] = useState({ name: '', email: '', checkin: '', checkout: '', room: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="book" className="py-24 px-6 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 text-center mb-4">Reservations</p>
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Book your bed</h2>
        <p className="text-center text-gray-400 font-light mb-14 text-sm">Free cancellation up to 48 hours before check-in.</p>

        {submitted ? (
          <div className="text-center py-16">
            <p className="font-serif text-3xl mb-4">You are all set! 🎒</p>
            <p className="text-gray-400 font-light">We will confirm your booking via email within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Full Name</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#F5E642] transition-colors text-sm"
                  placeholder="Jane Smith" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Email</label>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#F5E642] transition-colors text-sm"
                  placeholder="jane@email.com" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Check-in</label>
                <input type="date" required value={form.checkin} onChange={e => setForm({ ...form, checkin: e.target.value })}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-[#F5E642] transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Check-out</label>
                <input type="date" required value={form.checkout} onChange={e => setForm({ ...form, checkout: e.target.value })}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-[#F5E642] transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Room Type</label>
              <select required value={form.room} onChange={e => setForm({ ...form, room: e.target.value })}
                className="w-full bg-black border-b border-gray-700 py-3 text-white focus:outline-none focus:border-[#F5E642] transition-colors text-sm">
                <option value="">Select a room</option>
                <option value="mixed-dorm">Mixed Dorm (6-Bed) — NPR 800/night</option>
                <option value="female-dorm">Female Dorm (4-Bed) — NPR 950/night</option>
                <option value="private">Private Room — NPR 2,200/night</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Message (optional)</label>
              <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#F5E642] transition-colors text-sm resize-none"
                placeholder="Any special requests..." />
            </div>
            <div className="text-center pt-4">
              <button type="submit" className="bg-[#F5E642] text-black px-14 py-4 text-sm tracking-widest uppercase hover:bg-yellow-300 transition-colors">
                Confirm booking
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}