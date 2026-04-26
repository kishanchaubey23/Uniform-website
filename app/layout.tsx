import React from "react"
import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: 'MK Creations - Premium School Uniforms',
  description:
    'Quality school uniforms for every institution. Trusted by schools, loved by parents.',
}

export const viewport = {
  themeColor: '#1c1917',
}

import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 animate-gradient-bg text-white min-h-screen" suppressHydrationWarning>
        <NextTopLoader color="#ffffff" showSpinner={false} height={3} shadow="0 0 10px #ffffff,0 0 5px #ffffff" />
        <CartProvider>{children}</CartProvider>
        <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  )
}
