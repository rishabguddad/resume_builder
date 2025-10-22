'use client'

import { useState } from 'react'
import { FileText, Download, Share2, Save, Trash2, Plus, Eye } from 'lucide-react'

interface HeaderProps {
  onDownload?: () => void
  onSave?: () => void
  onShare?: () => void
  onClearAll?: () => void
  onNewResume?: () => void
  onPreview?: () => void
  resumeTitle?: string
  onTitleChange?: (title: string) => void
}

export function Header({ onDownload, onSave, onShare, onClearAll, onNewResume, onPreview, resumeTitle = 'My Resume', onTitleChange }: HeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(resumeTitle)

  const handleTitleSubmit = () => {
    onTitleChange?.(title)
    setIsEditingTitle(false)
  }

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit()
    }
    if (e.key === 'Escape') {
      setTitle(resumeTitle)
      setIsEditingTitle(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-16 shadow-sm">
      <div className="h-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <div className="p-2 bg-gradient-primary rounded-xl shadow-lg">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-accent-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold gradient-text">Resume Builder</h1>
              <p className="text-xs text-slate-500 -mt-1">Professional Resume Creator</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold gradient-text">Resume Builder</h1>
            </div>
          </div>
          
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button 
              onClick={onNewResume}
              className="btn-ghost flex items-center space-x-1 sm:space-x-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200"
              title="Start New Resume"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline">New Resume</span>
            </button>
            
            <button 
              onClick={onSave}
              className="btn-ghost flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200"
              title="Save Draft"
            >
              <Save className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline">Save Draft</span>
            </button>
            
            <button 
              onClick={onShare}
              className="btn-ghost flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200"
              title="Share Resume"
            >
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline">Share</span>
            </button>
            
            <div className="w-px h-4 sm:h-6 bg-slate-200 mx-1"></div>
            
            <button 
              onClick={onClearAll}
              className="btn-ghost flex items-center space-x-1 sm:space-x-2 text-error-600 hover:text-error-700 hover:bg-error-50 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200"
              title="Clear All Data"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline">Clear All</span>
            </button>
            
            <button 
              onClick={onPreview}
              className="btn-secondary flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200"
              title="Preview Resume"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            
            <button 
              onClick={onDownload}
              className="btn-primary flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              title="Download PDF"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
