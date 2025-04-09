"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

const jobDetails = {
  id: 1,
  title: "Software Developer",
  company: "Tech Solutions Inc.",
  location: "Remote Job",
  type: "Full Time",
  salary: "$80,000 - $120,000",
  experience: "3-5 years",
  description: "We are looking for a skilled Software Developer to join our dynamic team. The ideal candidate will have strong experience in modern web technologies and a passion for creating innovative solutions.",
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    "3+ years of experience in web development",
    "Proficiency in React, Node.js, and TypeScript",
    "Experience with cloud platforms (AWS/Azure)",
    "Strong problem-solving abilities",
    "Excellent communication skills"
  ],
  benefits: [
    "Competitive salary",
    "Health insurance",
    "Remote work options",
    "Professional development",
    "Flexible hours",
    "401(k) matching"
  ],
  image: "/images/cat.jpg"
}

export default function JobDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  // In a real app, you would fetch the job details based on the id
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-64 bg-[#0077b6]">
        <div className="absolute top-4 left-4 z-10">
          <Link href="/job-board">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden">
              <Image
                src={jobDetails.image}
                alt={jobDetails.company}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{jobDetails.title}</h1>
              <p className="text-blue-100">{jobDetails.company}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-6 space-y-6">
        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium">{jobDetails.location}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Job Type</p>
            <p className="font-medium">{jobDetails.type}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Salary Range</p>
            <p className="font-medium">{jobDetails.salary}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Experience</p>
            <p className="font-medium">{jobDetails.experience}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">{jobDetails.description}</p>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {jobDetails.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Benefits</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {jobDetails.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <button className="w-full bg-[#0077b6] text-white py-4 rounded-xl font-semibold hover:bg-[#0077b6]/90 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
} 