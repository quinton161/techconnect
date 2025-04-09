"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, Home, MessageCircle, Search, Users } from "lucide-react"
import Link from "next/link"
import BottomNav from "@/components/BottomNav"

// Sample chat data with real images
const recentContacts = [
  {
    name: "Daniel Mudimba",
    image: "/images/daniel.jpg",
    online: true
  },
  {
    name: "Sarah Johnson",
    image: "/images/sarah.jpg",
    online: true
  },
  {
    name: "Tech Connect AI",
    image: "/images/ai.svg",
    online: true
  },
  {
    name: "Tech Group",
    image: "/images/team.png",
    isGroup: true,
    members: [
      { image: "/images/daniel.jpg" },
      { image: "/images/sarah.jpg" },
      { image: "/images/david.jpg" },
      { image: "/images/team.png" }
    ],
    memberCount: 7,
    groupImage: "/images/team.png"
  }
]

export default function MessagingInterface() {
  return (
    <div className="max-w-md mx-auto bg-white h-[100dvh] flex flex-col">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-blue-500">Messaging</h1>
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/images/david.jpg" alt="Profile" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" className="text-blue-500">
            <Bell className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Recent contacts - Horizontal scroll */}
        <div className="flex gap-2 p-4 overflow-x-auto">
          {recentContacts.map((contact, index) => (
            <Link 
              key={index} 
              href={contact.isGroup ? "/chats/team" : "#"} 
              className="relative flex-shrink-0"
            >
              {contact.isGroup ? (
                <Avatar className="h-16 w-16 border-2 border-gray-200 bg-black flex items-center justify-center">
                  {contact.groupImage ? (
                    <AvatarImage src={contact.groupImage} alt={contact.name} className="p-2" />
                  ) : (
                    <div className="flex flex-wrap gap-0.5 p-1">
                      {contact.members?.slice(0, 4).map((member, idx) => (
                        <Avatar key={idx} className="h-6 w-6">
                          <AvatarImage src={member.image} alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </Avatar>
              ) : (
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarImage src={contact.image} alt={contact.name} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              {contact.online && (
                <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-500 text-white text-xs py-1 text-center rounded-b-lg">
                {contact.isGroup ? `+${contact.memberCount} More` : contact.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="px-4 py-2 sticky top-0 bg-white z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input className="pl-10 bg-gray-100 border-none rounded-full" placeholder="Search for chat..." />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-4 pb-20">
          <h2 className="text-lg font-medium mb-2">All Chats</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 sticky top-16 bg-white z-10">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full"
              >
                All Chats
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full"
              >
                Unread
              </TabsTrigger>
              <TabsTrigger
                value="groups"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full"
              >
                Groups
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                <ChatItem 
                  name="Daniel Mudimba" 
                  status="Working on the new design..." 
                  image="/images/daniel.jpg"
                  href="/chats/daniel"
                />
                <ChatItem 
                  name="Tech Project Team" 
                  status="Sarah: Great progress everyone!" 
                  image="/images/team.png"
                  href="/chats/team"
                />
                <ChatItem
                  image="/images/ai.svg"
                  name="Tech Connect AI"
                  message="I'd be happy to help with your coding questions!"
                  time="11:30 AM"
                  unread={2}
                  isOnline={true}
                  href="/chats/ai"
                />
                <ChatItem 
                  name="Sarah Johnson" 
                  status="Thanks for the feedback!" 
                  image="/images/sarah.jpg"
                  href="/chats/sarah"
                />
              </div>
            </TabsContent>
            <TabsContent value="unread">
              <div className="text-center py-8 text-gray-500">No unread messages</div>
            </TabsContent>
            <TabsContent value="groups">
              <div className="text-center py-8 text-gray-500">No group chats</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Nav - Fixed */}
      <div className="sticky bottom-0 bg-white border-t">
        <BottomNav />
      </div>
    </div>
  )
}

function ChatItem({ 
  name, 
  status, 
  image, 
  message, 
  time, 
  unread, 
  isOnline, 
  href = "#" 
}: { 
  name: string; 
  status?: string; 
  image: string; 
  message?: string;
  time?: string;
  unread?: number;
  isOnline?: boolean;
  href?: string;
}) {
  const isGroup = name === "Tech Project Team";
  const content = (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className={`h-16 w-16 ${isGroup ? 'bg-black' : 'bg-gray-200'}`}>
          <AvatarImage 
            src={isGroup ? "/images/team.png" : image} 
            alt={name}
            className={isGroup ? '' : ''} 
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        {isOnline && (
          <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
        )}
      </div>
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-gray-500 text-sm">{message || status}</p>
        {time && <p className="text-xs text-gray-400">{time}</p>}
        {unread && <span className="inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{unread}</span>}
      </div>
    </div>
  );

  if (href !== "#") {
    return (
      <Link href={href} className="block hover:bg-gray-50 rounded-lg p-2">
        {content}
      </Link>
    );
  }

  return (
    <div className="block hover:bg-gray-50 rounded-lg p-2">
      {content}
    </div>
  );
} 