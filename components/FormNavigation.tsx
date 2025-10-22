'use client'

import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

interface FormNavigationProps {
  onPrevious: () => void
  onNext: () => void
  onViewFinalResume?: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  isLastStep: boolean
  nextButtonText?: string
}

export function FormNavigation({ 
  onPrevious, 
  onNext, 
  onViewFinalResume,
  canGoPrevious, 
  canGoNext, 
  isLastStep,
  nextButtonText = 'Next Section'
}: FormNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 mt-6">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`btn-secondary flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
          !canGoPrevious 
            ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' 
            : 'hover:shadow-md hover:-translate-y-0.5'
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-4">
        {isLastStep && (
          <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-success text-white rounded-lg text-sm font-medium">
            <Check className="h-4 w-4" />
            <span>All Sections Complete!</span>
          </div>
        )}
        
        <button
          onClick={() => {
            console.log('Navigation button clicked, isLastStep:', isLastStep, 'onViewFinalResume:', !!onViewFinalResume)
            if (isLastStep && onViewFinalResume) {
              onViewFinalResume()
            } else {
              onNext()
            }
          }}
          disabled={!canGoNext}
          className={`btn-primary flex items-center space-x-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
            !canGoNext 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:shadow-xl hover:-translate-y-1'
          }`}
        >
          <span>{isLastStep ? 'View Final Resume' : nextButtonText}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
