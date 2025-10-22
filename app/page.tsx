'use client'

import { useState, useRef } from 'react'
import { ResumeForm } from '@/components/ResumeForm'
import { ResumePreview } from '@/components/ResumePreview'
import { Header } from '@/components/Header'
import { ProgressIndicator } from '@/components/ProgressIndicator'
import { FloatingActionButton } from '@/components/FloatingActionButton'
import { ResumeData } from '@/types/resume'

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/johnsmith',
      website: 'https://johnsmith.dev',
      summary: 'Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating scalable web applications and leading development teams.'
    },
    experience: [
      {
        id: '1',
        company: 'TechCorp Solutions',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: 'Led development of scalable web applications using React and Node.js. Managed a team of 5 developers and implemented CI/CD pipelines.',
        achievements: [
          'Increased application performance by 40% through code optimization',
          'Led migration to microservices architecture',
          'Mentored 3 junior developers'
        ]
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Berkeley, CA',
        startDate: '2018-09',
        endDate: '2022-05',
        current: false,
        gpa: '3.8',
        achievements: [
          'Magna Cum Laude',
          'Dean\'s List for 4 semesters'
        ]
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Leadership'],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce platform with React frontend and Node.js backend',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'https://ecommerce-demo.com',
        github: 'https://github.com/johnsmith/ecommerce',
        startDate: '2023-01',
        endDate: '2023-06',
        current: false
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-03',
        url: 'https://aws.amazon.com/certification/'
      }
    ]
  })

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')

  const handlePreview = () => {
    setActiveTab('preview')
  }

  const handleDownload = () => {
    // Switch to preview tab first, then trigger download
    setActiveTab('preview')
    // The actual download will be triggered by the ResumePreview component
    setTimeout(() => {
      const downloadButton = document.querySelector('[data-download-button]') as HTMLButtonElement
      if (downloadButton) {
        downloadButton.click()
      }
    }, 100)
  }

  const handleSaveDraft = () => {
    // Save current resume data to localStorage
    localStorage.setItem('resumeDraft', JSON.stringify(resumeData))
    alert('Draft saved successfully!')
  }

  const handleShareResume = () => {
    // Generate a shareable link or copy to clipboard
    const shareData = {
      title: 'My Resume',
      text: 'Check out my resume built with Resume Builder',
      url: window.location.href
    }
    
    if (navigator.share) {
      navigator.share(shareData)
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Resume link copied to clipboard!')
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header 
        onPreview={handlePreview}
        onDownload={handleDownload}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-soft border border-gray-200 w-full max-w-md">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 ${
                  activeTab === 'form'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Build Resume
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 ${
                  activeTab === 'preview'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Preview & Download
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <ProgressIndicator data={resumeData} />
            </div>
          </div>

          {/* Content */}
          <div className="w-full">
            {activeTab === 'form' ? (
              <div className="max-w-5xl mx-auto">
                <ResumeForm data={resumeData} setData={setResumeData} onPreview={handlePreview} />
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <ResumePreview data={resumeData} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onSave={handleSaveDraft}
        onShare={handleShareResume}
      />
    </div>
  )
}
