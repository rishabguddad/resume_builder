'use client'

import { useState } from 'react'
import { Save, Share2, Plus } from 'lucide-react'

interface FloatingActionButtonProps {
  onSave?: () => void
  onShare?: () => void
}

export function FloatingActionButton({ onSave, onShare }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    onSave?.()
    setIsOpen(false)
  }

  const handleShare = () => {
    onShare?.()
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Action Menu */}
      <div className={`absolute bottom-20 right-0 space-y-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        <button
          onClick={handleSave}
          className="flex items-center space-x-3 bg-white text-gray-700 px-5 py-3 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-xl transform hover:scale-105"
        >
          <Save className="h-5 w-5" />
          <span className="font-medium">Save Draft</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center space-x-3 bg-white text-gray-700 px-5 py-3 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-xl transform hover:scale-105"
        >
          <Share2 className="h-5 w-5" />
          <span className="font-medium">Share Resume</span>
        </button>
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 bg-primary-600 text-white rounded-xl shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-700 hover:bg-primary-700 ${
          isOpen ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
        } hover:shadow-xl active:shadow-xl`}
      >
        <Plus className="h-4 w-4 mx-auto" />
      </button>
    </div>
  )
}
