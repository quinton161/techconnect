"use client"

import { ArrowLeft, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MentorMatchingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Simulate loading time, then show results
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Reduced to 3 seconds for better UX
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#e6f7ff] flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <div className="fixed top-6 left-6">
        <Link href="/mentorship">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
      </div>

      {loading ? (
        <>
          {/* Tilted Cards with Thumbs Up */}
          <div className="relative w-full max-w-[320px] h-[300px] mb-20 perspective-500">
            {/* Left Card (Back) */}
            <div className="absolute top-0 left-0 w-[220px] h-[280px] transform -rotate-6 shadow-xl rounded-2xl overflow-hidden bg-amber-500 z-10">
              <Image
                src="/images/black2.jpg"
                alt="Mentor 1"
                fill
                className="object-cover"
              />
              
              {/* Thumbs Up Icons */}
              <div className="absolute top-8 right-2 flex flex-col gap-2 items-center">
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
              </div>
            </div>
            
            {/* Right Card (Front) */}
            <div className="absolute top-0 right-0 w-[220px] h-[280px] transform rotate-6 shadow-xl rounded-2xl overflow-hidden z-20">
              <Image
                src="/images/black1.jpg"
                alt="Mentor 2"
                fill
                className="object-cover"
              />
              
              {/* Thumbs Up Icons */}
              <div className="absolute top-8 right-2 flex flex-col gap-2 items-center">
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0077b6] rounded-full flex items-center justify-center shadow-md">
                  <ThumbsUp size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Spinner */}
          <div className="relative w-16 h-16 mb-10">
            <div className="absolute inset-0 border-t-4 border-r-4 border-b-4 border-l-4 border-black rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-r-transparent border-b-transparent border-l-transparent border-black rounded-full animate-spin"></div>
            
            {/* Dots */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
            
            {/* Inner Dots */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-black rounded-full"></div>
          </div>
          
          {/* Text */}
          <h1 className="text-3xl font-bold text-black">Finding A Mentor</h1>
        </>
      ) : (
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="flex justify-between w-full mb-8">
            <h1 className="text-3xl font-bold text-black">Your Matches</h1>
            <button className="text-[#0077b6] font-semibold">Edit filters</button>
          </div>
          
          {/* Mentor Cards */}
          <div className="w-full space-y-6">
            {/* First Mentor Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-60 w-full">
                <Image
                  src="/images/black1.jpg"
                  alt="Mentor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">Michael Johnson</h3>
                    <p className="text-gray-600">Software Engineer at Google</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    98% Match
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Node.js</span>
                </div>
                <button className="w-full py-3 bg-[#0077b6] text-white rounded-lg font-medium">
                  Connect
                </button>
              </div>
            </div>
            
            {/* Second Mentor Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-60 w-full">
                <Image
                  src="/images/black2.jpg"
                  alt="Mentor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">David Williams</h3>
                    <p className="text-gray-600">Senior Developer at Microsoft</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    94% Match
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">TypeScript</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Azure</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">C#</span>
                </div>
                <button className="w-full py-3 bg-[#0077b6] text-white rounded-lg font-medium">
                  Connect
                </button>
              </div>
            </div>
            
            {/* View More Button */}
            <button className="w-full py-3 border-2 border-[#0077b6] text-[#0077b6] rounded-lg font-medium bg-white">
              View More Matches
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 