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
          <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-lg bg-blue-500 flex items-center justify-center">
            <Image
              src="/images/ai.svg"
              alt="AI avatar"
              width={48}
              height={48}
              className="object-cover p-2"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg">Tech Connect AI</h1>
            <p className="text-sm text-green-600">Always Online</p>
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
              src="/images/david.jpg"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="bg-gray-200 rounded-2xl py-2 px-4 max-w-[80%]">
            <p>Can you help me with some coding questions?</p>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden flex-shrink-0 flex items-center justify-center">
            <Image
              src="/images/ai.svg"
              alt="AI avatar"
              width={32}
              height={32}
              className="object-cover p-1"
            />
          </div>
          <div className="bg-blue-500 text-white rounded-2xl py-2 px-4 max-w-[80%]">
            <p>Of course! I'd be happy to help. What specific questions do you have about coding?</p>
          </div>
        </div>

        {/* User question */}
        <div className="flex justify-end">
          <div className="bg-gray-200 rounded-2xl py-3 px-4 max-w-[80%] ml-auto">
            <p>I'm trying to understand React hooks. Can you explain useEffect?</p>
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

        {/* AI Response with code */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden flex-shrink-0 flex items-center justify-center">
            <Image
              src="/images/ai.svg"
              alt="AI avatar"
              width={32}
              height={32}
              className="object-cover p-1"
            />
          </div>
          <div className="bg-blue-500 text-white rounded-2xl py-2 px-4 max-w-[80%]">
            <p>useEffect is a React Hook that lets you synchronize a component with an external system. Here's a simple example:</p>
            <pre className="bg-blue-600 rounded-lg p-2 mt-2 text-sm overflow-x-auto">
              {`useEffect(() => {
  // This runs after every render
  document.title = \`You clicked \${count} times\`;
}, [count]); // Only re-run if count changes`}
            </pre>
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
          <input type="text" placeholder="Ask me anything about coding..." className="flex-1 py-2 px-3 outline-none" />
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