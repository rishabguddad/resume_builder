'use client'

import { FileText, Download, Eye } from 'lucide-react'

interface HeaderProps {
  onPreview?: () => void
  onDownload?: () => void
}

export function Header({ onPreview, onDownload }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 rounded-lg shadow-sm">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-sm text-gray-600">Create ATS-friendly resumes in minutes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-600 bg-green-50 px-2 py-1 rounded-md">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Auto-saved</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={onPreview}
                className="btn-secondary flex items-center space-x-1 px-3 py-1.5 text-sm hover:bg-gray-100 transition-colors"
              >
                <Eye className="h-3 w-3" />
                <span className="hidden sm:inline font-medium">Preview</span>
              </button>
              <button 
                onClick={onDownload}
                className="btn-primary flex items-center space-x-1 px-3 py-1.5 text-sm hover:bg-primary-700 transition-colors"
              >
                <Download className="h-3 w-3" />
                <span className="font-medium">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
