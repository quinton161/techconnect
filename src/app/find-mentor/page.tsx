"use client"

import { ArrowLeft, ThumbsUp, Bell, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function MentorMatching() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showEmojis, setShowEmojis] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setShowEmojis(true)
  }, [])

  const emojiPositions = [
    { left: "45%", top: "25%", delay: 0 },
    { left: "40%", top: "40%", delay: 0.5 },
    { left: "45%", top: "55%", delay: 1 },
    { left: "40%", top: "70%", delay: 1.5 },
    { left: "45%", top: "85%", delay: 2 },
  ]

  const handleContinue = () => {
    router.push('/mentor-chat') // You'll need to create this page
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#e6f2f7]">
      <div className="max-w-md mx-auto w-full bg-white min-h-screen flex flex-col relative">
        {/* Header - Always visible */}
        <div className="bg-white sticky top-0 z-50">
          <div className="p-4 flex items-center justify-between">
            <Link href="/community">
              <ArrowLeft className="w-6 h-6 text-black" />
            </Link>
            <h1 className="text-2xl font-bold text-[#0077b6]">Tech Connect</h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/images/community1.png"
                  width={32}
                  height={32}
                  alt="Profile"
                  className="object-cover"
                />
              </div>
              <Bell className="w-6 h-6 text-[#0077b6]" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between px-4 py-2 gap-3 bg-white">
            <button className="flex items-center justify-center gap-1 bg-gray-100 rounded-full px-6 py-2 flex-1">
              <span className="text-sm">Industry</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-1 bg-gray-100 rounded-full px-6 py-2 flex-1">
              <span className="text-sm">Age</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-1 bg-gray-100 rounded-full px-6 py-2 flex-1">
              <span className="text-sm">Country</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-2">Find A Mentor</h2>
            <p className="text-center text-gray-600 mb-6">Find the perfect Mentor for you to help kickstart your journey</p>

            {/* Mentor Grid - Exact match to image */}
            <div className="grid grid-cols-12 gap-1 auto-rows-auto">
              {/* First Row */}
              <div className="col-span-6 rounded-tl-xl overflow-hidden" style={{ backgroundColor: '#f8b249', aspectRatio: '1/1' }}>
                <Image
                  src="/images/black1.jpg"
                  width={300}
                  height={300}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-6 rounded-tr-xl overflow-hidden" style={{ backgroundColor: '#f8b249', aspectRatio: '1/1' }}>
                <Image
                  src="/images/black2.jpg"
                  width={300}
                  height={300}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Second Row */}
              <div className="col-span-4 overflow-hidden" style={{ backgroundColor: '#f2f2f2', aspectRatio: '1/1' }}>
                <Image
                  src="/images/black3.jpg"
                  width={200}
                  height={200}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-6 row-span-2 overflow-hidden" style={{ backgroundColor: '#f8b249', aspectRatio: '6/8' }}>
                <Image
                  src="/images/black5.jpg"
                  width={300}
                  height={400}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 overflow-hidden" style={{ backgroundColor: '#e9c8ff', aspectRatio: '1/1' }}>
                <Image
                  src="/images/black4.jpg"
                  width={100}
                  height={100}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Third Row */}
              <div className="col-span-4 rounded-bl-xl overflow-hidden" style={{ backgroundColor: '#d95548', aspectRatio: '1/1' }}>
                <Image
                  src="/images/black1.jpg"
                  width={200}
                  height={200}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 rounded-br-xl overflow-hidden" style={{ backgroundColor: '#e9c8ff', aspectRatio: '1/1' }}>
                <Image
                  src="/images/black3.jpg"
                  width={100}
                  height={100}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className="sticky bottom-0 left-0 right-0 bg-white shadow-lg">
          <div className="p-4">
            <Button 
              onClick={handleContinue}
              className="w-full py-6 text-lg bg-[#0077b6] hover:bg-[#00689d] text-white"
            >
              Continue
            </Button>
          </div>
          <div className="flex justify-center pb-4">
            <div className="w-16 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}