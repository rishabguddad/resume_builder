'use client'

import { PersonalInfo } from '@/types/resume'
import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from 'lucide-react'

interface PersonalInfoSectionProps {
  data: PersonalInfo
  setData: (data: PersonalInfo) => void
}

export function PersonalInfoSection({ data, setData }: PersonalInfoSectionProps) {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    setData({
      ...data,
      [field]: value
    })
  }

  const isFieldValid = (field: keyof PersonalInfo, value: string) => {
    if (field === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
    if (field === 'phone') {
      return /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))
    }
    if (field === 'linkedin' || field === 'website') {
      return value === '' || /^https?:\/\/.+/.test(value)
    }
    return value.length > 0
  }

  return (
    <div className="space-y-8">
      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="label flex items-center space-x-2">
            <div className="p-1 bg-primary-100 rounded-md">
              <User className="h-4 w-4 text-primary-600" />
            </div>
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className={`input-field ${
              data.fullName && !isFieldValid('fullName', data.fullName)
                ? 'border-error-300 focus:ring-error-500'
                : data.fullName && isFieldValid('fullName', data.fullName)
                ? 'border-success-300 focus:ring-success-500'
                : ''
            }`}
            placeholder="John Doe"
            required
          />
          {data.fullName && !isFieldValid('fullName', data.fullName) && (
            <p className="text-error-500 text-xs mt-1 flex items-center space-x-1">
              <span>⚠</span>
              <span>Please enter a valid name</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="label flex items-center space-x-2">
            <div className="p-1 bg-primary-100 rounded-md">
              <Mail className="h-4 w-4 text-primary-600" />
            </div>
            <span>Email Address *</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={`input-field ${
              data.email && !isFieldValid('email', data.email)
                ? 'border-error-300 focus:ring-error-500'
                : data.email && isFieldValid('email', data.email)
                ? 'border-success-300 focus:ring-success-500'
                : ''
            }`}
            placeholder="john.doe@email.com"
            required
          />
          {data.email && !isFieldValid('email', data.email) && (
            <p className="text-error-500 text-xs mt-1 flex items-center space-x-1">
              <span>⚠</span>
              <span>Please enter a valid email address</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="label flex items-center space-x-2">
            <div className="p-1 bg-primary-100 rounded-md">
              <Phone className="h-4 w-4 text-primary-600" />
            </div>
            <span>Phone Number</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="label flex items-center space-x-2">
            <div className="p-1 bg-primary-100 rounded-md">
              <MapPin className="h-4 w-4 text-primary-600" />
            </div>
            <span>Location</span>
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="input-field"
            placeholder="City, State"
          />
        </div>

        <div className="space-y-2">
          <label className="label flex items-center space-x-2">
            <div className="p-1 bg-primary-100 rounded-md">
              <Linkedin className="h-4 w-4 text-primary-600" />
            </div>
            <span>LinkedIn Profile</span>
          </label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
            className="input-field"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <label className="label flex items-center space-x-2">
            <div className="p-1 bg-primary-100 rounded-md">
              <Globe className="h-4 w-4 text-primary-600" />
            </div>
            <span>Website/Portfolio</span>
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updateField('website', e.target.value)}
            className="input-field"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-3">
        <label className="label flex items-center space-x-2">
          <div className="p-1 bg-primary-100 rounded-md">
            <FileText className="h-4 w-4 text-primary-600" />
          </div>
          <span>Professional Summary</span>
        </label>
        <div className="relative">
          <textarea
            value={data.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            className="input-field h-32 resize-none"
            placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              data.summary.length > 450 
                ? 'text-error-600 bg-error-50' 
                : data.summary.length > 400 
                ? 'text-warning-600 bg-warning-50' 
                : 'text-slate-500 bg-slate-50'
            }`}>
              {data.summary.length}/500
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          💡 Tip: Keep it concise and highlight your most relevant skills and achievements
        </p>
      </div>
    </div>
  )
}
