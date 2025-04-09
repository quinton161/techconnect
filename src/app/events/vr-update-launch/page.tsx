'use client';

import Image from "next/image";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function VREventPage() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header Image with Navigation */}
      <div className="relative">
        <Image
          src="/images/vr.png"
          alt="Person wearing VR headset"
          width={500}
          height={400}
          className="w-full h-[300px] object-cover"
        />

        {/* Navigation */}
        <div className="absolute top-4 left-4">
          <Link href="/community">
            <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm rounded-full h-10 w-10">
              <ArrowLeft className="h-6 w-6 text-white" />
            </Button>
          </Link>
        </div>

        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm rounded-full h-10 w-10">
            <Heart className="h-6 w-6 text-white" />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div className="w-8 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title and Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">VR Update Launch</h1>
          <Button className="bg-[#0077b6] hover:bg-[#00689d] text-white rounded-full px-4 py-2 text-sm">
            Free Entry
          </Button>
        </div>

        {/* Network Joined */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">5+ People in Your Network Joined</span>
            <div className="flex -space-x-2 ml-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-white overflow-hidden">
                  <Image
                    src="/images/community1.png"
                    alt="Community member"
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <a href="#" className="text-[#0077b6] text-sm">
            View All
          </a>
        </div>

        {/* Location */}
        <div className="flex items-start mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
            <MapPin className="h-6 w-6 text-[#0077b6]" />
          </div>
          <div>
            <p className="font-medium">Bulawayo</p>
            <p className="text-gray-700">Zimbabwe International Trade Fair</p>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-start mb-10">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
            <Clock className="h-6 w-6 text-[#0077b6]" />
          </div>
          <div>
            <p className="font-medium">April 21-22 2025</p>
            <p className="text-gray-700">1205-1400</p>
          </div>
        </div>

        {/* Confirm Button */}
        <Button className="w-full py-6 text-lg bg-[#0077b6] hover:bg-[#00689d] mt-auto">
          Confirm Attendance
        </Button>
      </div>

      {/* Bottom Indicator */}
      <div className="flex justify-center pb-4">
        <div className="w-16 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
} 