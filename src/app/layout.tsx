import type { Metadata } from 'next'
import '../index.css'

const siteUrl = 'https://saihtetaung.vercel.app'
const siteName = 'Sai Htet Aung'
const siteTitle = 'Sai Htet Aung | Portfolio'
const siteDescription = 'Full-stack engineer portfolio for Sai Htet Aung.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Sai Htet Aung',
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName,
    type: 'website',
    images: [
      {
        url: '/og-portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Sai Htet Aung portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-portfolio.png'],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sai Htet Aung',
    url: siteUrl,
    jobTitle: 'Full-Stack Developer',
    sameAs: ['https://github.com/SaiHtetAung-mn'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
