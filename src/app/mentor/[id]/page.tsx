"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, use } from "react"
import BottomNav from "@/components/BottomNav"

const mentors = [
  {
    id: 1,
    name: "Rodney Moyo",
    role: "UX/UI Designer",
    image: "/images/black2.jpg",
    bgColor: "bg-[#ffa726]",
    description: "Rodney Moyo, a leading User Experience Designer in crafting highly beautiful and clean animated websites, applications..."
  },
  {
    id: 2,
    name: "Rajesh Moor",
    role: "UX/UI Designer",
    image: "/images/rajesh.jpg",
    bgColor: "bg-gray-200",
    description: "Rajesh Moor is an experienced UX/UI Designer with a passion for creating user-centered digital experiences..."
  },
  {
    id: 3,
    name: "Jane Collins",
    role: "UX/UI Designer",
    image: "/images/jane.jpg",
    bgColor: "bg-gray-100",
    description: "Jane Collins brings a unique perspective to UX/UI design with her background in psychology and human-computer interaction..."
  },
  {
    id: 4,
    name: "David Chikanga",
    role: "UX/UI Designer",
    image: "/images/david.jpg",
    bgColor: "bg-gray-200",
    description: "David Chikanga is a versatile UX/UI Designer who combines creativity with technical expertise..."
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "UX/UI Designer",
    image: "/images/sarah.jpg",
    bgColor: "bg-pink-200",
    description: "Sarah Johnson specializes in creating delightful user experiences through thoughtful design solutions..."
  },
  {
    id: 6,
    name: "Michelle Lee",
    role: "UX/UI Designer",
    image: "/images/black4.jpg",
    bgColor: "bg-purple-200",
    description: "Michelle Lee is a UX/UI Designer known for her minimalist and functional design approach..."
  }
]

const fullDescriptions = {
  1: "Rodney Moyo, a leading User Experience Designer in crafting highly beautiful and clean animated websites, applications, and digital products. With over 5 years of experience in the field, Rodney specializes in creating intuitive and engaging user interfaces that enhance the overall user experience.",
  2: "Rajesh Moor is an experienced UX/UI Designer with a passion for creating user-centered digital experiences. He has worked with numerous startups and established companies to deliver innovative design solutions that drive user engagement and business growth.",
  3: "Jane Collins brings a unique perspective to UX/UI design with her background in psychology and human-computer interaction. She focuses on creating accessible and inclusive designs that cater to diverse user needs.",
  4: "David Chikanga is a versatile UX/UI Designer who combines creativity with technical expertise. His work spans across mobile applications, web platforms, and digital products, always prioritizing user needs and business objectives.",
  5: "Sarah Johnson specializes in creating delightful user experiences through thoughtful design solutions. With expertise in both UX research and UI design, she helps businesses transform their digital presence.",
  6: "Michelle Lee is a UX/UI Designer known for her minimalist and functional design approach. She excels in creating clean, modern interfaces that provide seamless user experiences across different platforms."
}

export default function MentorProfile({ params }: { params: Promise<{ id: string }> }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const { id } = use(params)
  const mentor = mentors.find(m => m.id === parseInt(id))
  
  if (!mentor) {
    return <div>Mentor not found</div>
  }

  const fullDescription = fullDescriptions[mentor.id as keyof typeof fullDescriptions]

  return (
    <div className="h-screen overflow-y-auto bg-[#ffa726]">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/mentor-list">
          <ArrowLeft className="w-7 h-7 text-white" />
        </Link>
      </div>

      {/* Top Image Section */}
      <div className="w-full h-[65vh] relative">
        <Image
          src={mentor.image}
          alt={mentor.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Section */}
      <div className="relative bg-white rounded-t-[2rem] -mt-6">
        <div className="px-6 pt-8 pb-32">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-[28px] font-bold mb-1">{mentor.name}</h1>
            <p className="text-gray-500 text-lg">{mentor.role}</p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {showFullDescription ? fullDescription : mentor.description}
              {!showFullDescription && (
                <button 
                  onClick={() => setShowFullDescription(true)}
                  className="text-[#0077b6] font-medium ml-1 hover:underline"
                >
                  Read More
                </button>
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-[#0077b6] text-white py-[14px] rounded-[14px] text-lg font-medium shadow-sm hover:bg-[#0077b6]/90 transition-colors">
              Request Mentorship
            </button>
            <button className="w-full bg-white text-[#0077b6] border border-[#0077b6] py-[14px] rounded-[14px] text-lg font-medium hover:bg-[#0077b6]/5 transition-colors">
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white">
        <BottomNav />
      </div>
    </div>
  )
} 