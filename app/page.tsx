'use client'

import { useState, useRef, useEffect } from 'react'
import { ResumeForm } from '@/components/ResumeForm'
import { Header } from '@/components/Header'
import { StepSidebar } from '@/components/StepSidebar'
import { PreviewPanel } from '@/components/PreviewPanel'
import { ResumePreview } from '@/components/ResumePreview'
import { ResumeData } from '@/types/resume'
import { Download } from 'lucide-react'

export default function Home() {
  const getEmptyResumeData = (): ResumeData => ({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  })

  const [resumeData, setResumeData] = useState<ResumeData>(getEmptyResumeData())
  const [activeSection, setActiveSection] = useState('personal')
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(true)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [resumeTitle, setResumeTitle] = useState('My Resume')

  // Load saved draft on component mount, unless fresh start is requested
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const freshStart = urlParams.get('fresh') === 'true'
        
        if (freshStart) {
          // Clear any saved data and start fresh
          localStorage.removeItem('resumeDraft')
          setResumeData(getEmptyResumeData())
          setResumeTitle('My Resume')
          setActiveSection('personal')
          // Remove the fresh parameter from URL
          window.history.replaceState({}, '', window.location.pathname)
        } else {
          // Load saved draft if available
          const savedDraft = localStorage.getItem('resumeDraft')
          if (savedDraft) {
            try {
              const parsedData = JSON.parse(savedDraft)
              setResumeData(parsedData)
            } catch (error) {
              console.error('Error loading saved draft:', error)
              // If there's an error parsing, start fresh
              setResumeData(getEmptyResumeData())
            }
          }
        }
      } catch (error) {
        console.error('Error in useEffect:', error)
        setResumeData(getEmptyResumeData())
      }
    }
  }, [])

  const handleDownload = async () => {
    console.log('Download button clicked')
    // Find the resume element and generate PDF directly
    if (typeof window !== 'undefined') {
      const resumeElement = document.querySelector('[data-resume-content]') as HTMLElement
      console.log('Resume element found:', resumeElement)
      if (resumeElement) {
        try {
          const { generatePDF } = await import('@/utils/pdfGenerator')
          console.log('Starting PDF generation...')
          await generatePDF(resumeElement, 'resume.pdf')
          console.log('PDF generated successfully')
        } catch (error) {
          console.error('Failed to generate PDF:', error)
          alert('Failed to generate PDF. Please try again.')
        }
      } else {
        console.error('Resume element not found')
        alert('Resume content not found. Please try again.')
      }
    }
  }

  const handlePreviewClick = () => {
    console.log('Preview button clicked')
    setShowFullPreview(true)
  }

  const handleCloseFullPreview = () => {
    setShowFullPreview(false)
  }

  const handleSaveDraft = () => {
    console.log('Save draft button clicked')
    // Save current resume data to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('resumeDraft', JSON.stringify(resumeData))
        console.log('Draft saved successfully')
        alert('Draft saved successfully!')
      } catch (error) {
        console.error('Failed to save draft:', error)
        alert('Failed to save draft. Please try again.')
      }
    }
  }

  const handleShareResume = () => {
    // Generate a shareable link or copy to clipboard
    if (typeof window !== 'undefined') {
      const shareData = {
        title: 'My Resume',
        text: 'Check out my resume built with Resume Builder',
        url: window.location.href
      }
      
      if (navigator.share) {
        navigator.share(shareData).catch(console.error)
      } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('Resume link copied to clipboard!'))
          .catch(() => alert('Failed to copy link. Please try again.'))
      }
    }
  }

  const handleClearAll = () => {
    console.log('Clear all button clicked')
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setResumeData(getEmptyResumeData())
      setResumeTitle('My Resume')
      setActiveSection('personal')
      // Clear any saved drafts
      try {
        localStorage.removeItem('resumeDraft')
        console.log('All data cleared successfully')
        alert('All data has been cleared!')
      } catch (error) {
        console.error('Failed to clear saved draft:', error)
        alert('All data has been cleared!')
      }
    }
  }

  const handleFreshStart = () => {
    // Redirect to fresh start URL
    if (typeof window !== 'undefined') {
      window.location.href = window.location.pathname + '?fresh=true'
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <Header 
        onDownload={handleDownload}
        onSave={handleSaveDraft}
        onShare={handleShareResume}
        onClearAll={handleClearAll}
        onNewResume={handleFreshStart}
        onPreview={handlePreviewClick}
        resumeTitle={resumeTitle}
        onTitleChange={setResumeTitle}
      />
      
      <div className="relative h-[calc(100vh-4rem)]">
        {/* Main Content Area - Only Form Editor */}
        <div className="overflow-y-auto h-full">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Title Section - Smaller */}
            <div className="mb-6">
              <div className="card-compact">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-slate-900">Resume Title</h2>
                  <div className="text-xs text-slate-500">Step 1 of 6</div>
                </div>
                <div className="max-w-sm">
                  <input
                    type="text"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                    className="input-field text-base font-semibold"
                    placeholder="Enter your resume title"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    💡 Give your resume a descriptive title
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Section - Below title on all screen sizes */}
            <div className="mb-6">
              <StepSidebar 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                data={resumeData}
                isMobile={true}
              />
            </div>

            {/* Form Sections */}
            <ResumeForm 
              data={resumeData} 
              setData={setResumeData} 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onViewFinalResume={handlePreviewClick}
            />
          </div>
        </div>
      </div>

      {/* Full Page Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Resume Preview</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={handleCloseFullPreview}
                  className="btn-ghost flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
            
            {/* Preview Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-5rem)] p-6">
              <ResumePreview data={resumeData} onDownload={handleDownload} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
