"use client"

import Image from "next/image"
import { ArrowLeft, Heart, MoreHorizontal, ImageIcon, Mic } from "lucide-react"
import Link from "next/link"

export default function ChatInterface() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link href="/chats" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-lg">
            <Image
              src="/images/sarah.jpg"
              alt="Sarah avatar"
              width={48}
              height={48}
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg">Sarah Johnson</h1>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          <MoreHorizontal className="w-6 h-6" />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {/* First user message */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <Image
              src="/images/sarah.jpg"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="bg-gray-200 rounded-2xl py-2 px-4 max-w-[80%]">
            <p>Thanks for the feedback on my last PR!</p>
          </div>
        </div>

        {/* Response messages */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white rounded-2xl py-3 px-4 max-w-[80%] ml-auto">
            <p>No problem! Your code was really clean</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 ml-2">
            <Image
              src="/images/david.jpg"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <Image
              src="/images/sarah.jpg"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="bg-gray-200 rounded-2xl py-2 px-4 max-w-[80%]">
            <p>I'm working on the new feature now. Should have it ready by tomorrow.</p>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
          <Image
            src="/images/david.jpg"
            alt="User avatar"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
        <button className="p-2">
          <MoreHorizontal className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center border rounded-full overflow-hidden">
          <button className="p-2 ml-2">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input type="text" placeholder="Type your message here..." className="flex-1 py-2 px-3 outline-none" />
        </div>
        <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <Mic className="w-5 h-5 text-blue-500" />
        </button>
      </div>

      {/* Bottom indicator bar */}
      <div className="h-1 w-1/3 mx-auto bg-black rounded-full mb-1"></div>
    </div>
  )
} 