"use client"

import { ArrowLeft, Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import BottomNav from "@/components/BottomNav"

export default function MentorList() {
  const mentors = [
    {
      id: 1,
      name: "Rodney Moyo",
      role: "UX/UI Designer",
      image: "/images/black2.jpg",
      bgColor: "bg-[#ffa726]"
    },
    {
      id: 2,
      name: "Rajesh Moor",
      role: "UX/UI Designer",
      image: "/images/rajesh.jpg",
      bgColor: "bg-gray-200"
    },
    {
      id: 3,
      name: "Jane Collins",
      role: "UX/UI Designer",
      image: "/images/jane.jpg",
      bgColor: "bg-gray-100"
    },
    {
      id: 4,
      name: "David Chikanga",
      role: "UX/UI Designer",
      image: "/images/david.jpg",
      bgColor: "bg-gray-200"
    },
    {
      id: 5,
      name: "Sarah Johnson",
      role: "UX/UI Designer",
      image: "/images/sarah.jpg",
      bgColor: "bg-pink-200"
    },
    {
      id: 6,
      name: "Michelle Lee",
      role: "UX/UI Designer",
      image: "/images/black4.jpg",
      bgColor: "bg-purple-200"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white pb-16">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/find-mentor">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-[#0077b6] text-2xl font-bold">Tech Connect</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                width={32}
                height={32}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Bell className="w-6 h-6 text-[#0077b6]" />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4">
          <h2 className="text-xl font-medium mb-6">Mentors Based On Your Profile</h2>
          
          {/* Mentor Grid */}
          <div className="grid grid-cols-2 gap-4">
            {mentors.map((mentor) => (
              <Link 
                key={mentor.id}
                href={`/mentor/${mentor.id}`}
                className={`relative rounded-xl overflow-hidden aspect-square ${mentor.bgColor} cursor-pointer transition-transform hover:scale-105`}
              >
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">{mentor.name}</h3>
                  <p className="text-white text-sm">{mentor.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
} 