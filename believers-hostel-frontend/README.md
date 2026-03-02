# NomadNest Hostel — Next.js Frontend

A clean, editorial-style hostel website built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by a minimal Squarespace aesthetic with serif typography and yellow accent CTAs.

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles + Google Fonts
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage (assembles all sections)
└── components/
    ├── Navbar.tsx         # Fixed top nav (black, centered brand, yellow CTA)
    ├── Hero.tsx           # Full-bleed hero with overlay text
    ├── Features.tsx       # 3-column icon feature grid
    ├── Rooms.tsx          # Room cards with pricing
    ├── MidCTA.tsx         # Full-bleed mid-page CTA section
    ├── SplitSection.tsx   # Text/image split sections
    ├── Testimonials.tsx   # Guest review cards
    ├── BookingContact.tsx # Booking form
    └── Footer.tsx         # Footer with links & contact
```

## Customization

- **Brand name**: Search and replace `NomadNest` across all files
- **Colors**: Yellow accent is `#F5E642`. Change in `globals.css` (`--yellow`) and Tailwind classes
- **Images**: Replace Unsplash URLs in `Hero.tsx`, `MidCTA.tsx`, `Rooms.tsx`, `SplitSection.tsx` with your own photos
- **Pricing & content**: Update room details in `Rooms.tsx`, features in `Features.tsx`
- **Fonts**: Loaded from Google Fonts in `globals.css` — swap `Playfair Display` for any serif of your choice

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** (Playfair Display + DM Sans)
