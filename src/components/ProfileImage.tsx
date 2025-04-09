"use client"

import Image from "next/image"
import Link from "next/link"

interface ProfileImageProps {
  src: string
  alt?: string
  size?: number
  className?: string
}

export default function ProfileImage({ 
  src, 
  alt = "Profile picture",
  size = 32,
  className = ""
}: ProfileImageProps) {
  return (
    <Link href="/profile" className={`block rounded-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
      />
    </Link>
  )
} 