"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const interestCategories = [
  {
    name: 'Programming Languages',
    items: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'TypeScript', 'Swift', 'Kotlin']
  },
  {
    name: 'Web Development',
    items: ['React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express', 'Django', 'Ruby on Rails']
  },
  {
    name: 'Mobile Development',
    items: ['iOS', 'Android', 'React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose']
  },
  {
    name: 'DevOps & Cloud',
    items: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins']
  },
  {
    name: 'Data Science',
    items: ['Machine Learning', 'Data Analysis', 'Big Data', 'AI', 'Deep Learning', 'NLP', 'Python']
  }
]

interface InterestsScreenProps {
  userId: string
}

export default function InterestsScreen({ userId }: InterestsScreenProps) {
  const router = useRouter()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    )
  }

  const saveInterests = async () => {
    if (selectedInterests.length < 3) {
      alert('Please select at least 3 interests')
      return
    }

    setIsSaving(true)
    try {
      const userRef = doc(db, 'users', userId)
      
      // Get the current user data first
      const userSnap = await getDoc(userRef)
      const userData = userSnap.exists() ? userSnap.data() : {}
      
      // Update with interests
      await setDoc(userRef, {
        ...userData,
        interests: selectedInterests
      }, { merge: true })
      
      router.push('/home')
    } catch (error) {
      console.error('Error saving interests:', error)
      alert('There was an error saving your interests. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Link href="/home">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <h1 className="text-2xl font-bold text-[#0077b6]">Tech Connect</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Select Your Interests</h2>
        <p className="text-gray-600 mb-6">
          Choose at least 3 interests to help us personalize your experience
        </p>

        {interestCategories.map((category, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((interest, i) => (
                <button
                  key={i}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedInterests.includes(interest)
                      ? 'bg-[#0077b6] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t">
        <button
          onClick={saveInterests}
          disabled={selectedInterests.length < 3 || isSaving}
          className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 ${
            selectedInterests.length < 3 || isSaving
              ? 'bg-gray-300 text-gray-500'
              : 'bg-[#0077b6] text-white'
          }`}
        >
          {isSaving ? 'Saving...' : 'Continue'}
          {!isSaving && <ChevronRight className="w-5 h-5" />}
        </button>
        <p className="text-center text-gray-500 text-sm mt-3">
          {selectedInterests.length < 3 
            ? `Select at least ${3 - selectedInterests.length} more interest${selectedInterests.length === 2 ? '' : 's'}` 
            : `${selectedInterests.length} interests selected`}
        </p>
      </div>
    </div>
  )
} 