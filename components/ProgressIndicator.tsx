'use client'

import { ResumeData } from '@/types/resume'

interface ProgressIndicatorProps {
  data: ResumeData
}

export function ProgressIndicator({ data }: ProgressIndicatorProps) {
  const calculateProgress = () => {
    let completedSections = 0
    const totalSections = 6

    // Personal Information
    if (data.personalInfo.fullName && data.personalInfo.email) {
      completedSections++
    }

    // Work Experience
    if (data.experience.length > 0) {
      completedSections++
    }

    // Education
    if (data.education.length > 0) {
      completedSections++
    }

    // Skills
    if (data.skills.length > 0) {
      completedSections++
    }

    // Projects
    if (data.projects.length > 0) {
      completedSections++
    }

    // Certifications
    if (data.certifications.length > 0) {
      completedSections++
    }

    return Math.round((completedSections / totalSections) * 100)
  }

  const progress = calculateProgress()

  return (
    <div className="bg-white rounded-lg p-3 shadow-soft border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Progress</span>
        <span className="text-sm font-semibold text-primary-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress === 100 && (
        <p className="text-xs text-green-600 text-center mt-1 font-medium">
          🎉 Complete!
        </p>
      )}
    </div>
  )
}
