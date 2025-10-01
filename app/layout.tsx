import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "D'Barja - Pollería y Chifa | Pollo a la Brasa y Chaufa en Lima",
  description:
    "Sabor que deja huella - La mejor pollería y chifa de Lima. Especialistas en pollo a la brasa, chaufa, arroz chaufa, tallarín saltado, wantán frito y comida china peruana. Delivery y local.",
  generator: "v0.app",
  keywords: [
    "pollería Lima",
    "pollo a la brasa",
    "pollo a la brasa Lima",
    "chifa Lima",
    "chaufa",
    "arroz chaufa",
    "chaufa de pollo",
    "chaufa especial",
    "tallarín saltado",
    "wantán frito",
    "comida china peruana",
    "pollería chifa",
    "D'Barja",
    "delivery pollo a la brasa",
    "mejor pollería Lima",
    "chifa delivery",
    "comida peruana",
    "comida china Lima",
    "pollo brasa delivery",
    "restaurante pollería",
    "restaurante chifa",
  ],
  authors: [{ name: "D'Barja Pollería Chifa" }],
  creator: "D'Barja",
  publisher: "D'Barja Pollería Chifa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dbarja.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "D'Barja - Pollería y Chifa | Pollo a la Brasa y Chaufa",
    description:
      "Sabor que deja huella - La mejor pollería y chifa de Lima. Especialistas en pollo a la brasa, chaufa y comida china peruana.",
    url: "https://dbarja.com",
    siteName: "D'Barja Pollería Chifa",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "D'Barja Pollería Chifa - Sabor que deja huella",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D'Barja - Pollería y Chifa | Pollo a la Brasa y Chaufa",
    description: "Sabor que deja huella - La mejor pollería y chifa de Lima.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.jpg", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.jpg", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.jpg", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "D'Barja Pollería Chifa",
              image: "https://dbarja.com/logo.png",
              description: "Pollería y chifa especializada en pollo a la brasa, chaufa y comida china peruana",
              servesCuisine: ["Peruana", "China", "Pollería", "Chifa"],
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PE",
                addressLocality: "Lima",
              },
              url: "https://dbarja.com",
              telephone: "+51",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "11:00",
                  closes: "23:00",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
