'use client'

import { useState } from 'react'
import { PersonalInfoSection } from './sections/PersonalInfoSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { EducationSection } from './sections/EducationSection'
import { SkillsSection } from './sections/SkillsSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { CertificationsSection } from './sections/CertificationsSection'
import { SectionHeader } from './SectionHeader'
import { FormNavigation } from './FormNavigation'
import { ResumeData } from '@/types/resume'
import { User, Briefcase, GraduationCap, Code, Award, Star } from 'lucide-react'

const sections = [
  { id: 'personal', title: 'Personal Information', icon: User },
  { id: 'experience', title: 'Work Experience', icon: Briefcase },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'skills', title: 'Skills', icon: Code },
  { id: 'projects', title: 'Projects', icon: Star },
  { id: 'certifications', title: 'Certifications', icon: Award },
]

interface ResumeFormProps {
  data: ResumeData
  setData: (data: ResumeData) => void
  activeSection: string
  onSectionChange: (sectionId: string) => void
  onViewFinalResume?: () => void
}

export function ResumeForm({ data, setData, activeSection, onSectionChange, onViewFinalResume }: ResumeFormProps) {

  const updateData = (section: keyof ResumeData, newData: any) => {
    setData({
      ...data,
      [section]: newData
    })
  }

  const goToNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection)
    if (currentIndex < sections.length - 1) {
      onSectionChange(sections[currentIndex + 1].id)
    }
  }

  const goToPreviousSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection)
    if (currentIndex > 0) {
      onSectionChange(sections[currentIndex - 1].id)
    }
  }

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === activeSection)
  }

  const getCurrentStepNumber = (sectionId: string) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId)
    return sectionIndex + 2 // +2 because title is step 1
  }

  const isLastSection = () => {
    return getCurrentSectionIndex() >= sections.length - 1
  }

  const isFirstSection = () => {
    return getCurrentSectionIndex() === 0
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoSection
            data={data.personalInfo}
            setData={(newData) => updateData('personalInfo', newData)}
          />
        )
      case 'experience':
        return (
          <ExperienceSection
            data={data.experience}
            setData={(newData) => updateData('experience', newData)}
          />
        )
      case 'education':
        return (
          <EducationSection
            data={data.education}
            setData={(newData) => updateData('education', newData)}
          />
        )
      case 'skills':
        return (
          <SkillsSection
            data={data.skills}
            setData={(newData) => updateData('skills', newData)}
          />
        )
      case 'projects':
        return (
          <ProjectsSection
            data={data.projects}
            setData={(newData) => updateData('projects', newData)}
          />
        )
      case 'certifications':
        return (
          <CertificationsSection
            data={data.certifications}
            setData={(newData) => updateData('certifications', newData)}
          />
        )
      default:
        return null
    }
  }

  const getSectionInfo = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return null
    
    const descriptions = {
      personal: 'Add your contact information and professional summary',
      experience: 'List your work experience and achievements',
      education: 'Include your educational background and qualifications',
      skills: 'Highlight your technical and soft skills',
      projects: 'Showcase your projects and portfolio work',
      certifications: 'Add relevant certifications and licenses'
    }
    
    return {
      ...section,
      description: descriptions[sectionId as keyof typeof descriptions] || '',
      stepNumber: getCurrentStepNumber(sectionId),
      totalSteps: sections.length + 1, // +1 for title step
      isCompleted: getSectionStatus(sectionId) === 'completed'
    }
  }

  const getSectionStatus = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return data.personalInfo.fullName && data.personalInfo.email && data.personalInfo.summary ? 'completed' : 'pending'
      case 'experience':
        return data.experience.length > 0 ? 'completed' : 'pending'
      case 'education':
        return data.education.length > 0 ? 'completed' : 'pending'
      case 'skills':
        return data.skills.length > 0 ? 'completed' : 'pending'
      case 'projects':
        return data.projects.length > 0 ? 'completed' : 'pending'
      case 'certifications':
        return data.certifications.length > 0 ? 'completed' : 'pending'
      default:
        return 'pending'
    }
  }

  const sectionInfo = getSectionInfo(activeSection)
  if (!sectionInfo) return null

  return (
    <div className="space-y-8">
      {/* Fixed Section Header - Prevents layout shift */}
      <div className="min-h-[120px]">
        <SectionHeader
          title={sectionInfo.title}
          description={sectionInfo.description}
          icon={sectionInfo.icon}
          stepNumber={sectionInfo.stepNumber}
          totalSteps={sectionInfo.totalSteps}
          isCompleted={sectionInfo.isCompleted}
        />
      </div>

      {/* Section Content */}
      <div className="card fade-in">
        {renderSection()}
      </div>

      {/* Navigation */}
      <div className="min-h-[80px]">
        <FormNavigation
          onPrevious={goToPreviousSection}
          onNext={goToNextSection}
          onViewFinalResume={onViewFinalResume}
          canGoPrevious={!isFirstSection()}
          canGoNext={true}
          isLastStep={isLastSection()}
        />
      </div>
    </div>
  )
}
