"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowLeft, Bell, ChevronRight, LogOut, Users } from "lucide-react"
import Link from "next/link"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"

interface MenuItemProps {
  icon: ReactNode
  label: string
  labelClassName?: string
  href: string
}

function IconImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-5 h-5">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
    </div>
  )
}

function MenuItem({ icon, label, labelClassName = "", href }: MenuItemProps) {
  return (
    <Link 
      href={href} 
      className="flex items-center justify-between w-full p-3 sm:p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {icon}
        <span className={`text-[15px] ${labelClassName}`}>{label}</span>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </Link>
  )
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push('/auth');
          return;
        }

        // Get additional user data from Firestore if available
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData({
            ...userDoc.data(),
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || userDoc.data().displayName || user.email?.split('@')[0]
          });
        } else {
          // If no document exists, just use the auth data
          setUserData({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0]
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#0077b6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white pb-20">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 safe-top">
          <Link href="/home" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <Link href="/notifications" className="p-1">
            <Bell size={24} className="text-[#0077b6]" />
          </Link>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6">
            {/* Profile Info */}
            <div className="flex flex-col items-center pt-2 pb-6 sm:pb-8">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4">
                <Image
                  src={userData?.profileImage || "/images/default-profile.jpg"}
                  alt="Profile picture"
                  fill
                  className="rounded-full border-2 border-gray-100 shadow-sm object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/default-profile.jpg";
                  }}
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {userData?.displayName || "User"}
              </h1>
              <p className="text-gray-600 mb-6 sm:mb-8">{userData?.role || "Tech Connect User"}</p>

              <div className="w-full space-y-3 sm:space-y-4">
                {userData?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-6 flex justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <span className="text-gray-700 text-[15px]">{userData.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-6 flex justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <span className="text-gray-700 text-[15px]">{userData?.email}</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex-1 bg-[#0077b6] text-white rounded-2xl p-3 sm:p-4 text-center shadow-sm">
                <p className="text-[15px] font-medium mb-1">Connections</p>
                <p className="text-xl sm:text-2xl font-bold">{userData?.connections || 0}</p>
              </div>
              <div className="flex-1 bg-[#0077b6] text-white rounded-2xl p-3 sm:p-4 text-center shadow-sm">
                <p className="text-[15px] font-medium mb-1">Group Projects</p>
                <p className="text-xl sm:text-2xl font-bold">{userData?.projects || 0}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2 sm:space-y-3">
              <MenuItem 
                icon={<IconImage src="/images/home.svg" alt="Home" />}
                label="Home" 
                href="/home"
              />
              <MenuItem 
                icon={<IconImage src="/images/community vector.png" alt="Community" />}
                label="Community" 
                href="/community"
              />
              <MenuItem 
                icon={<IconImage src="/images/massage.svg" alt="Chat" />}
                label="Chat" 
                href="/chat"
              />
              <MenuItem 
                icon={<Users size={20} className="text-gray-700" />} 
                label="Your connections" 
                href="/connections"
              />
              <div 
                className="flex items-center justify-between w-full p-3 sm:p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <LogOut size={20} className="text-red-500" />
                  <span className="text-[15px] text-red-500">Log Out</span>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="mt-8 sm:mt-12 px-6 pb-safe">
            <div className="h-1 w-full bg-gray-900 rounded-full max-w-[120px] mx-auto opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 