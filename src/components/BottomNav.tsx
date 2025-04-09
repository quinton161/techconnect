"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItemProps {
  href: string
  icon: string
  label: string
  isActive: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link 
      href={href}
      className="flex-1 flex flex-col items-center gap-1"
    >
      <div className="relative w-6 h-6">
        <Image
          src={icon}
          alt={label}
          fill
          className={`object-contain transition-colors ${isActive ? "brightness-0" : "opacity-50"}`}
        />
      </div>
    </Link>
  )
}

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="max-w-md mx-auto px-6 py-2">
        <nav className="flex items-center justify-between">
          <NavItem
            href="/"
            icon="/images/home.svg"
            label="Home"
            isActive={pathname === "/"}
          />
          <NavItem
            href="/community"
            icon="/images/community vector.png"
            label="Community"
            isActive={pathname === "/community"}
          />
          <Link 
            href="/add"
            className="flex-1 flex justify-center items-center"
          >
            <div className="relative w-10 h-10 animate-pulse">
              <Image
                src="/images/ai.svg"
                alt="Add"
                fill
                className="object-contain brightness-0"
              />
            </div>
          </Link>
          <NavItem
            href="/chats"
            icon="/images/massage.svg"
            label="Chat"
            isActive={pathname === "/chats"}
          />
          <NavItem
            href="/profile"
            icon="/images/david.jpg"
            label="Profile"
            isActive={pathname === "/profile"}
          />
        </nav>
      </div>
    </div>
  )
} 