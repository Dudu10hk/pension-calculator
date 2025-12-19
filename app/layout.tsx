import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

// Removed Manrope font import to avoid SSL certificate issues
// Using system fonts instead

export const metadata: Metadata = {
  title: 'תכנון פרישה מוקדמת',
  description: 'גלו מתי תוכלו לפרוש',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-display flex flex-col min-h-screen">
        {children}
        <Footer />
      </body>
    </html>
  )
}

