'use client';

import { Inter } from "next/font/google"
import "./globals.css"
import StyledComponentsRegistry from "./registry"
import { useEffect, useState } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}>
        <StyledComponentsRegistry>
          <div style={{ 
            height: '100vh', 
            overflow: 'hidden',
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative',
            background: 'white'
          }}>
          {mounted ? children : null}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
