'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
      scrolled ? 'bg-blue-900 shadow-lg' : 'bg-transparent'
    } text-white`}>
      <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-wide">
        <Link href="#rooms" className="hover:opacity-60 transition-opacity">Rooms</Link>
        <Link href="#amenities" className="hover:opacity-60 transition-opacity">Facilities</Link>
        <Link href="#about" className="hover:opacity-60 transition-opacity">About</Link>
      </div>

      <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-lg tracking-widest uppercase">
        Believers Hostel
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm font-light">
        <Link href="#contact" className="hover:opacity-60 transition-opacity">Contact</Link>
        <Link href="#book" className="bg-white text-blue-700 px-5 py-2 text-xs font-medium tracking-wider uppercase hover:bg-blue-100 transition-colors">
          Apply Now
        </Link>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Instagram" className="hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
        </div>
      </div>

      <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <div className="space-y-1.5">
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-900 py-6 px-8 flex flex-col gap-5 text-sm md:hidden">
          <Link href="#rooms" onClick={() => setMenuOpen(false)}>Rooms</Link>
          <Link href="#amenities" onClick={() => setMenuOpen(false)}>Facilities</Link>
          <Link href="#about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="#book" className="bg-white text-blue-700 px-5 py-2 text-center text-xs uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Apply Now</Link>
        </div>
      )}
    </nav>
  )
}