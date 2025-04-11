"use client"

import { ArrowLeft, Bell, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MentorshipPage() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const mainContent = contentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleContinue = () => {
    router.push('/home');
  };

  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-white">
      <div className="max-w-md mx-auto w-full bg-white h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white sticky top-0 z-50">
          <div className="p-4 flex items-center justify-between">
            <Link href="/community">
              <ArrowLeft className="w-6 h-6 text-black" />
            </Link>
            <h1 className="text-2xl font-bold text-[#0077b6]">Tech Connect</h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/images/default-profile.jpg"
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
          <div className="flex justify-between px-4 py-2 gap-2">
            <button className="flex items-center justify-between gap-1 bg-gray-100 rounded-full px-4 py-2 flex-1">
              <span className="text-sm font-medium">Industry</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-between gap-1 bg-gray-100 rounded-full px-4 py-2 flex-1">
              <span className="text-sm font-medium">Age</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-between gap-1 bg-gray-100 rounded-full px-4 py-2 flex-1">
              <span className="text-sm font-medium">Country</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div 
          ref={contentRef} 
          className="flex-1 overflow-y-auto -webkit-overflow-scrolling-touch scroll-smooth px-4 py-6"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#0077b6 transparent' }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">Find A Mentor</h2>
          <p className="text-center text-gray-600 mb-6">Find the perfect Mentor for you to help kickstart your journey</p>

          {/* Mentor Grid - Exact match to image */}
          <div className="grid grid-cols-12 gap-2 mb-6">
            {/* Top Row */}
            <div className="col-span-6 aspect-square rounded-2xl overflow-hidden bg-amber-500/20">
              <Image
                src="/images/black1.jpg"
                width={300}
                height={300}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-6 aspect-square rounded-2xl overflow-hidden bg-amber-500/20">
              <Image
                src="/images/black2.jpg"
                width={300}
                height={300}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Middle Row */}
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src="/images/black3.jpg"
                width={150}
                height={150}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="col-span-6 row-span-2 rounded-2xl overflow-hidden bg-amber-500/20">
              <Image
                src="/images/black5.jpg"
                width={300}
                height={500}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden bg-purple-300/30">
              <Image
                src="/images/black4.jpg"
                width={150}
                height={150}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom Row */}
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden bg-red-500/20">
              <Image
                src="/images/black6.jpg"
                width={150}
                height={150}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden bg-purple-300/30">
              <Image
                src="/images/sarah.jpg"
                width={150}
                height={150}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom large image */}
            <div className="col-span-12 aspect-[3/1] rounded-2xl overflow-hidden bg-amber-500/10 mt-2">
              <Image
                src="/images/jane.jpg"
                width={600}
                height={200}
                alt="Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Add some extra space to ensure scrollability */}
            <div className="col-span-12 h-20"></div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="p-4 bg-white">
          <button 
            onClick={handleContinue}
            className="w-full py-4 text-lg bg-[#0077b6] hover:bg-[#00689d] text-white rounded-full font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
} 