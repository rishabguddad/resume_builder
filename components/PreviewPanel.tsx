'use client'

import { useState } from 'react'
import { ResumeData } from '@/types/resume'
import { ResumePreview } from './ResumePreview'
import { Download, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface PreviewPanelProps {
  data: ResumeData
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function PreviewPanel({ data, isCollapsed = false, onToggleCollapse }: PreviewPanelProps) {
  const [zoomLevel, setZoomLevel] = useState(100)

  const zoomLevels = [75, 100, 125, 150]
  
  const handleZoom = (level: number) => {
    setZoomLevel(level)
  }

  const resetZoom = () => {
    setZoomLevel(100)
  }

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white/60 backdrop-blur-xl border-l border-slate-200/60 flex flex-col items-center py-6 h-full">
        <button
          onClick={onToggleCollapse}
          className="p-3 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
          title="Show Preview"
        >
          <Eye className="h-5 w-5 text-slate-600 group-hover:text-primary-600 transition-colors" />
        </button>
        <div className="mt-4 text-xs text-slate-500 font-medium writing-mode-vertical-rl">
          Preview
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-l border-slate-200/60">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/60">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Eye className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live Preview</h3>
            <p className="text-xs text-slate-500">Real-time updates</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
            <button
              onClick={() => handleZoom(Math.max(75, zoomLevel - 25))}
              className="p-2 rounded-md hover:bg-slate-100 transition-all duration-200 group"
              title="Zoom Out"
            >
              <ZoomOut className="h-3 w-3 text-slate-600 group-hover:text-primary-600" />
            </button>
            
            <button
              onClick={resetZoom}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-md transition-all duration-200 min-w-[3rem]"
            >
              {zoomLevel}%
            </button>
            
            <button
              onClick={() => handleZoom(Math.min(150, zoomLevel + 25))}
              className="p-2 rounded-md hover:bg-slate-100 transition-all duration-200 group"
              title="Zoom In"
            >
              <ZoomIn className="h-3 w-3 text-slate-600 group-hover:text-primary-600" />
            </button>
          </div>

          {/* Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-slate-100 transition-all duration-200 group"
            title="Hide Preview"
          >
            <EyeOff className="h-4 w-4 text-slate-600 group-hover:text-slate-900" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-50/50 to-white">
        <div 
          className="bg-white shadow-2xl rounded-2xl border border-slate-200/60 overflow-hidden"
          style={{ 
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            width: `${100 / (zoomLevel / 100)}%`,
            minHeight: `${100 / (zoomLevel / 100)}%`
          }}
        >
          <ResumePreview data={data} />
        </div>
      </div>
    </div>
  )
}
