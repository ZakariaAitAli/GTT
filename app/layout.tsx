import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Link from 'next/link'
import ThemeSwitcher from './components/ThemeSwitcher'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gestion Temps de Travail',
  description: 'application de gestion Temps de Travail',
}




export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>




          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}