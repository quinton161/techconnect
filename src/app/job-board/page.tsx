"use client"

import { ArrowLeft, Bell, Home, MapPin, MessageSquare, Search, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import BottomNav from "@/components/BottomNav"

export default function JobBoard() {
  return (
    <div className="fixed inset-0 bg-white">
      <div className="max-w-md mx-auto h-full flex flex-col">
        {/* Header */}
        <header className="p-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-1">
              <Home className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-blue-500">Job Board</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/images/Rectangle 2.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <button className="text-blue-500">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="px-4 mb-4 bg-white">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Industry..."
              className="w-full py-3 pl-10 pr-10 bg-gray-100 rounded-full text-sm"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 flex gap-3 mb-6 bg-white">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium">Full Time</button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium">Remote</button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium">Internship</button>
        </div>

        {/* Job Listings - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 space-y-4 pb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((job, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl shadow-sm bg-white">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src="/images/team.png" alt="Team" width={80} height={80} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Software Developer</h3>
                    <p className="text-gray-600 mb-2">Full Time</p>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Remote Job</span>
                    </div>
                    <div className="flex justify-start">
                      <button className="px-5 py-1.5 border border-blue-500 text-blue-500 rounded-full text-sm">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  )
} 