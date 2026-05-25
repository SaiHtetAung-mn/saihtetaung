import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'Sai Htet Aung | Portfolio',
  description: 'Full-stack engineer portfolio for Sai Htet Aung.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
