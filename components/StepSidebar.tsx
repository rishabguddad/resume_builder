'use client'

import { Check, User, Briefcase, GraduationCap, Code, Star, Award } from 'lucide-react'
import { ResumeData } from '@/types/resume'

interface StepSidebarProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
  data: ResumeData
  isMobile?: boolean
}

const sections = [
  { id: 'personal', title: 'Personal Info', icon: User, shortTitle: 'Personal' },
  { id: 'experience', title: 'Experience', icon: Briefcase, shortTitle: 'Experience' },
  { id: 'education', title: 'Education', icon: GraduationCap, shortTitle: 'Education' },
  { id: 'skills', title: 'Skills', icon: Code, shortTitle: 'Skills' },
  { id: 'projects', title: 'Projects', icon: Star, shortTitle: 'Projects' },
  { id: 'certifications', title: 'Certifications', icon: Award, shortTitle: 'Certifications' },
]

export function StepSidebar({ activeSection, onSectionChange, data, isMobile = false }: StepSidebarProps) {
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

  const getCompletionPercentage = () => {
    const completedSections = sections.filter(section => getSectionStatus(section.id) === 'completed').length
    return Math.round((completedSections / sections.length) * 100)
  }

  if (isMobile) {
    return (
      <div className="w-full">
        {/* Progress and Steps - Same Line */}
        <div className="flex items-center justify-between gap-6">
          {/* Steps - Horizontal Scroll */}
          <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-hide flex-1">
            {sections.map((section, index) => {
              const Icon = section.icon
              const status = getSectionStatus(section.id)
              const isActive = activeSection === section.id
              
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
                    status === 'completed' 
                      ? 'bg-gradient-success text-white shadow-lg shadow-success-500/25' 
                      : isActive 
                      ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/25' 
                      : 'bg-white/80 text-slate-500 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  } ${isActive ? 'ring-2 ring-primary-200' : ''}`}
                  title={section.title}
                >
                  <div className="flex items-center space-x-3 min-w-[80px]">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      status === 'completed' 
                        ? 'bg-white/20' 
                        : isActive 
                        ? 'bg-white/20' 
                        : 'bg-slate-100'
                    }`}>
                      {status === 'completed' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`text-sm font-semibold leading-tight ${
                      isActive ? 'text-white' : status === 'completed' ? 'text-white' : 'text-slate-600'
                    }`}>
                      {section.shortTitle}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Progress Circle - Right Side */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary-500 transition-all duration-1000 ease-out"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  strokeDasharray={`${getCompletionPercentage()}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-700">{getCompletionPercentage()}%</span>
              </div>
            </div>
            <div className="text-base text-slate-700 font-semibold">
              {getCompletionPercentage() === 100 ? 'Complete!' : 'In Progress'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-20 bg-white/60 backdrop-blur-xl border-r border-slate-200/60 flex flex-col py-6 h-full">
      {/* Progress Header */}
      <div className="text-center mb-8 px-2">
        <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Progress</div>
        <div className="relative w-12 h-12 mx-auto mb-3">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary-500 transition-all duration-1000 ease-out"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray={`${getCompletionPercentage()}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-700">{getCompletionPercentage()}%</span>
          </div>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {getCompletionPercentage() === 100 ? 'Complete!' : 'In Progress'}
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col space-y-3 w-full px-2">
        {sections.map((section, index) => {
          const Icon = section.icon
          const status = getSectionStatus(section.id)
          const isActive = activeSection === section.id
          
          return (
            <div key={section.id} className="relative group">
              {/* Connection Line */}
              {index < sections.length - 1 && (
                <div className={`absolute left-1/2 top-12 w-0.5 h-6 transform -translate-x-1/2 ${
                  status === 'completed' ? 'bg-gradient-to-b from-success-400 to-success-500' : 'bg-slate-200'
                }`}></div>
              )}
              
              {/* Step Button */}
              <button
                onClick={() => onSectionChange(section.id)}
                className={`relative w-full p-3 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                  status === 'completed' 
                    ? 'bg-gradient-success text-white shadow-lg shadow-success-500/25' 
                    : isActive 
                    ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/25' 
                    : 'bg-white/80 text-slate-500 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                } ${isActive ? 'ring-2 ring-primary-200' : ''}`}
                title={section.title}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    status === 'completed' 
                      ? 'bg-white/20' 
                      : isActive 
                      ? 'bg-white/20' 
                      : 'bg-slate-100'
                  }`}>
                    {status === 'completed' ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Icon className="h-3 w-3" />
                    )}
                  </div>
                  <div className={`text-xs font-semibold leading-tight text-center ${
                    isActive ? 'text-white' : status === 'completed' ? 'text-white' : 'text-slate-600'
                  }`}>
                    {section.shortTitle}
                  </div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-primary rounded-full"></div>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Completion Celebration */}
      {getCompletionPercentage() === 100 && (
        <div className="mt-6 text-center animate-bounce-in">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-success rounded-full mb-2">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div className="text-success-600 text-xs font-bold">Complete!</div>
          <div className="text-slate-500 text-xs">Ready to download</div>
        </div>
      )}
    </div>
  )
}
