"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import BottomNav from "@/components/BottomNav"

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  // Hide nav on tech loading, auth pages, and AI chat
  const hideNavPaths = [
    "/", // Initial tech loading
    "/tech", // Tech loading page
    "/login",
    "/signup",
    "/register",
    "/onboarding",
    "/add",
    "/auth" // Any auth-related pages
  ]
  
  // Show nav only after tech loading and auth, not on auth pages
  const showNav = !hideNavPaths.some(path => pathname.startsWith(path))

  return (
    <div id="root" suppressHydrationWarning>
      <main className={`min-h-[100dvh] bg-white ${showNav ? "pb-16" : ""}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  )
} 