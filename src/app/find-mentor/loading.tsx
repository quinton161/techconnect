"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoadingMentor() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center px-6">
      {/* Back Button */}
      <div className="fixed top-6 left-6">
        <Link href="/community">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Loading Animation */}
      <div className="relative w-full max-w-[300px] aspect-[4/3] mb-8">
        <div className="absolute top-0 left-0 w-3/4 h-full transform -rotate-12">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/images/black2.jpg"
              alt="Mentor 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-2 right-0 flex flex-col gap-1">
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-3/4 h-full transform rotate-12">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/images/black1.jpg"
              alt="Mentor 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-2 right-0 flex flex-col gap-1">
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <h1 className="text-2xl font-bold mb-4">Finding A Mentor</h1>
      
      {/* AI Icon Animation */}
      <div className="w-16 h-16 relative animate-pulse">
        <Image
          src="/images/ai.svg"
          alt="AI Loading"
          width={64}
          height={64}
          className="w-full h-full"
        />
      </div>
    </div>
  )
} 