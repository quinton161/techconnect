"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowLeft, Bell, ChevronRight, LogOut, Users } from "lucide-react"
import Link from "next/link"

interface MenuItemProps {
  icon: ReactNode
  label: string
  labelClassName?: string
  href: string
}

function IconImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-5 h-5">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
    </div>
  )
}

function MenuItem({ icon, label, labelClassName = "", href }: MenuItemProps) {
  return (
    <Link 
      href={href} 
      className="flex items-center justify-between w-full p-3 sm:p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {icon}
        <span className={`text-[15px] ${labelClassName}`}>{label}</span>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </Link>
  )
}

export default function ProfilePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white pb-20">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 safe-top">
          <Link href="/" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <Link href="/notifications" className="p-1">
            <Bell size={24} className="text-[#0077b6]" />
          </Link>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6">
            {/* Profile Info */}
            <div className="flex flex-col items-center pt-2 pb-6 sm:pb-8">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4">
                <Image
                  src="/images/david.jpg"
                  alt="Profile picture"
                  fill
                  className="rounded-full border-2 border-gray-100 shadow-sm object-cover"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">David Chikanga</h1>
              <p className="text-gray-600 mb-6 sm:mb-8">UI/UX Designer</p>

              <div className="w-full space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 flex justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <span className="text-gray-700 text-[15px]">+263 123456789</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 flex justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <span className="text-gray-700 text-[15px]">example@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex-1 bg-[#0077b6] text-white rounded-2xl p-3 sm:p-4 text-center shadow-sm">
                <p className="text-[15px] font-medium mb-1">Connections</p>
                <p className="text-xl sm:text-2xl font-bold">121</p>
              </div>
              <div className="flex-1 bg-[#0077b6] text-white rounded-2xl p-3 sm:p-4 text-center shadow-sm">
                <p className="text-[15px] font-medium mb-1">Group Projects</p>
                <p className="text-xl sm:text-2xl font-bold">5</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2 sm:space-y-3">
              <MenuItem 
                icon={<IconImage src="/images/home.svg" alt="Home" />}
                label="Home" 
                href="/"
              />
              <MenuItem 
                icon={<IconImage src="/images/community vector.png" alt="Community" />}
                label="Community" 
                href="/community"
              />
              <MenuItem 
                icon={<IconImage src="/images/massage.svg" alt="Chat" />}
                label="Chat" 
                href="/chat"
              />
              <MenuItem 
                icon={<Users size={20} className="text-gray-700" />} 
                label="Your connections" 
                href="/connections"
              />
              <MenuItem
                icon={<LogOut size={20} className="text-red-500" />}
                label="Log Out"
                labelClassName="text-red-500"
                href="/logout"
              />
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="mt-8 sm:mt-12 px-6 pb-safe">
            <div className="h-1 w-full bg-gray-900 rounded-full max-w-[120px] mx-auto opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 