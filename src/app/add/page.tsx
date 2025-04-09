"use client"

import { ArrowLeft, MoreHorizontal, Image as ImageIcon, Mic } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import ProfileImage from "@/components/ProfileImage"

// Add some predefined responses for common questions
const PREDEFINED_RESPONSES = {
  greetings: [
    "Hey! How can I help you today?",
    "Hello! What can I assist you with?",
    "Hi there! How may I help you?",
  ],
  about: [
    "Tech Connect is an application that was designed by the UX/UI enthusiast Daniel Mudimba.",
    "This platform was created by Daniel Mudimba, a passionate UX/UI designer.",
  ],
  inspiration: [
    "Daniel was inspired by the need to connect tech enthusiasts with experienced mentors in the field.",
    "The inspiration came from seeing how mentorship can accelerate career growth in tech.",
  ],
  features: [
    "I can help you find mentors, schedule meetings, and learn about different tech careers.",
    "You can use me to connect with industry experts and get guidance on your tech journey.",
  ],
  default: [
    "I'll help you find the information you need.",
    "Let me assist you with that.",
    "I'll do my best to help you with that.",
  ]
}

export default function AiChat() {
  const [loading, setLoading] = useState(true)
  const [thinking, setThinking] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'user',
      content: 'Hey'
    },
    {
      type: 'ai',
      content: 'Hey David. How may I help you?'
    },
    {
      type: 'user',
      content: 'Who designed this application?'
    },
    {
      type: 'ai',
      content: 'Tech Connect is an application that was designed by the UX/UI enthusiast Daniel Mudimba.'
    },
    {
      type: 'user',
      content: 'What inspired him?'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    // Show loading state for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Function to get appropriate response based on user input
  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()
    
    // Check for different types of questions
    if (message.includes('hey') || message.includes('hello') || message.includes('hi')) {
      return PREDEFINED_RESPONSES.greetings[Math.floor(Math.random() * PREDEFINED_RESPONSES.greetings.length)]
    }
    
    if (message.includes('who') && (message.includes('made') || message.includes('created') || message.includes('designed'))) {
      return PREDEFINED_RESPONSES.about[Math.floor(Math.random() * PREDEFINED_RESPONSES.about.length)]
    }
    
    if (message.includes('inspire') || message.includes('why') || message.includes('purpose')) {
      return PREDEFINED_RESPONSES.inspiration[Math.floor(Math.random() * PREDEFINED_RESPONSES.inspiration.length)]
    }
    
    if (message.includes('what') && message.includes('do') || message.includes('help') || message.includes('features')) {
      return PREDEFINED_RESPONSES.features[Math.floor(Math.random() * PREDEFINED_RESPONSES.features.length)]
    }
    
    return PREDEFINED_RESPONSES.default[Math.floor(Math.random() * PREDEFINED_RESPONSES.default.length)]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }])
    setInputMessage('')
    
    // Show thinking state
    setThinking(true)
    
    // Simulate AI processing time (0.5-1.5 seconds)
    const thinkingTime = Math.random() * 1000 + 500
    
    setTimeout(() => {
      const response = getAIResponse(inputMessage)
      setMessages(prev => [...prev, { type: 'ai', content: response }])
      setThinking(false)
    }, thinkingTime)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 relative animate-beep">
            <Image
              src="/images/ai.svg"
              alt="Tech Connect AI"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="/images/ai.svg"
                  alt="Tech Connect AI"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold">Tech Connect A.I</span>
            </div>
          </div>
          <button>
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 border-b border-[#0077b6]/20">
        <div className="space-y-8">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'} items-start`}
            >
              {message.type === 'user' && (
                <ProfileImage
                  src="/images/david.jpg"
                  size={32}
                  className="mr-2 flex-shrink-0"
                />
              )}
              <div 
                className={`rounded-[24px] px-4 py-3 max-w-[85%] ${
                  message.type === 'user' 
                    ? 'bg-[#EEEEEE]' 
                    : 'bg-[#0077b6] text-white'
                }`}
              >
                <p className="text-[15px]">{message.content}</p>
              </div>
              {message.type === 'ai' && (
                <div className="w-8 h-8 relative ml-2 flex-shrink-0">
                  <Image
                    src="/images/ai.svg"
                    alt="AI"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="flex justify-end items-start">
              <div className="rounded-[24px] px-4 py-3 bg-[#0077b6] text-white">
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
              <div className="w-8 h-8 relative ml-2 flex-shrink-0">
                <Image
                  src="/images/ai.svg"
                  alt="AI"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white border-t border-[#0077b6]/20 p-4">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <div className="flex-1 flex items-center gap-3 bg-[#F5F5F5] rounded-full px-4 py-2.5">
            <ImageIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 bg-transparent text-[15px] placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button 
            className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors" 
            onClick={handleSendMessage}
          >
            <Mic className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
} 