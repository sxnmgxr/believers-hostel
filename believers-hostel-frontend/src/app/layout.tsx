import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NomadNest Hostel',
  description: 'Your home away from home. Budget-friendly stays, great people.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
