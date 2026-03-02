import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: '#ffffff' }} className="border-t border-slate-100 text-slate-700 py-16 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Top divider line */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="font-serif text-slate-400 text-sm tracking-widest uppercase">Believers Hostel</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-serif text-3xl tracking-widest uppercase mb-4 text-slate-800">Believers Hostel</p>
            <p className="text-slate-500 font-light text-sm leading-relaxed max-w-xs">
              A safe, nurturing, and disciplined residential facility for school students. We are committed to the holistic growth of every child in our care.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-100 flex items-center justify-center transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#0ea5e9"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-100 flex items-center justify-center transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-semibold text-sky-500 mb-6">Navigate</p>
            <ul className="space-y-3 text-sm font-light text-slate-600">
              <li>
                <Link href="#rooms" className="hover:text-sky-500 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-300 inline-block" /> Rooms
                </Link>
              </li>
              <li>
                <Link href="#amenities" className="hover:text-sky-500 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-300 inline-block" /> Facilities
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-sky-500 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-300 inline-block" /> About
                </Link>
              </li>
              <li>
                <Link href="#book" className="hover:text-sky-500 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-300 inline-block" /> Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-semibold text-sky-500 mb-6">Contact Us</p>
            <ul className="space-y-4 text-sm font-light text-slate-600">
              <li className="flex items-start gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>School Road, Believers Campus,<br />Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+977-1-4400000" className="hover:text-sky-500 transition-colors">+977-1-4400000</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:hostel@believers.edu.np" className="hover:text-sky-500 transition-colors">hostel@believers.edu.np</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025 Believers Hostel. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sky-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-500 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-sky-500 transition-colors">Admissions Policy</a>
          </div>
        </div>

      </div>
    </footer>
  )
}