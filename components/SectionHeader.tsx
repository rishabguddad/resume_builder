'use client'

import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  description: string
  icon: LucideIcon
  stepNumber: number
  totalSteps: number
  isCompleted?: boolean
}

export function SectionHeader({ 
  title, 
  description, 
  icon: Icon, 
  stepNumber, 
  totalSteps, 
  isCompleted = false 
}: SectionHeaderProps) {
  return (
    <div className="relative h-[120px] flex items-center">
      {/* Background decoration */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-primary opacity-5 rounded-full blur-xl"></div>
      
      <div className="relative flex items-center space-x-6 w-full">
        {/* Step Indicator - Fixed size */}
        <div className="relative flex-shrink-0">
          <div className={`step-indicator ${
            isCompleted ? 'step-completed' : 'step-current'
          }`}>
            {isCompleted ? (
              <Icon className="h-5 w-5" />
            ) : (
              <span className="text-lg font-bold">{stepNumber}</span>
            )}
          </div>
          
          {/* Progress ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-200"></div>
          <div 
            className="absolute inset-0 rounded-full border-2 border-primary-500 transition-all duration-1000 ease-out"
            style={{ 
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((stepNumber / totalSteps) * 2 * Math.PI - Math.PI / 2)}% ${50 + 50 * Math.sin((stepNumber / totalSteps) * 2 * Math.PI - Math.PI / 2)}%)`
            }}
          ></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4 min-w-0">
              <h2 className="section-header truncate">{title}</h2>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="status-success">
                  Step {stepNumber} of {totalSteps}
                </div>
                {isCompleted && (
                  <div className="status-success">
                    ✓ Complete
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="section-description max-w-2xl line-clamp-2">{description}</p>
          
          {/* Progress bar */}
          <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
