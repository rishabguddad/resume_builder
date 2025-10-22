'use client'

import { useState } from 'react'
import { PersonalInfoSection } from './sections/PersonalInfoSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { EducationSection } from './sections/EducationSection'
import { SkillsSection } from './sections/SkillsSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { CertificationsSection } from './sections/CertificationsSection'
import { ResumeData } from '@/types/resume'
import { User, Briefcase, GraduationCap, Code, Award, Star, ChevronRight } from 'lucide-react'

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
  onPreview?: () => void
}

export function ResumeForm({ data, setData, onPreview }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState('personal')

  const updateData = (section: keyof ResumeData, newData: any) => {
    setData({
      ...data,
      [section]: newData
    })
  }

  const goToNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id)
    } else {
      // If on last section, go to preview
      onPreview?.()
    }
  }

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === activeSection)
  }

  const isLastSection = () => {
    return getCurrentSectionIndex() >= sections.length - 1
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

  return (
    <div className="space-y-4">
      {/* Section Navigation */}
      <div className="section-card">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Resume Sections</h2>
          <p className="text-xs text-gray-600">Click on any section to start building your resume</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`section-button ${
                  activeSection === section.id
                    ? 'section-button-active'
                    : 'section-button-inactive'
                }`}
              >
                <div className="flex flex-col items-center space-y-1 text-center">
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium leading-tight">{section.title}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Section Content */}
      <div className="section-card fade-in">
        {renderSection()}
      </div>

      {/* Next/Preview Button */}
      <div className="flex justify-center">
        <button
          onClick={goToNextSection}
          className="btn-primary flex items-center space-x-2 px-6 py-2 text-sm"
        >
          <span>{isLastSection() ? 'Preview Resume' : 'Next Section'}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
