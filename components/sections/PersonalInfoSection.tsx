'use client'

import { PersonalInfo } from '@/types/resume'
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

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
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="p-1.5 bg-primary-100 rounded-lg">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
        </div>
        <p className="text-sm text-gray-600">Fill in your basic contact information and professional summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <User className="h-4 w-4 inline mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className={`input-field ${
              data.fullName && !isFieldValid('fullName', data.fullName)
                ? 'border-red-300 focus:ring-red-500'
                : data.fullName && isFieldValid('fullName', data.fullName)
                ? 'border-green-300 focus:ring-green-500'
                : ''
            }`}
            placeholder="John Doe"
            required
          />
          {data.fullName && !isFieldValid('fullName', data.fullName) && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid name</p>
          )}
        </div>

        <div>
          <label className="label">
            <Mail className="h-4 w-4 inline mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={`input-field ${
              data.email && !isFieldValid('email', data.email)
                ? 'border-red-300 focus:ring-red-500'
                : data.email && isFieldValid('email', data.email)
                ? 'border-green-300 focus:ring-green-500'
                : ''
            }`}
            placeholder="john.doe@email.com"
            required
          />
          {data.email && !isFieldValid('email', data.email) && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
          )}
        </div>

        <div>
          <label className="label">
            <Phone className="h-4 w-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="label">
            <MapPin className="h-4 w-4 inline mr-1" />
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="input-field"
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="label">
            <Linkedin className="h-4 w-4 inline mr-1" />
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
            className="input-field"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="label">
            <Globe className="h-4 w-4 inline mr-1" />
            Website/Portfolio
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

      <div>
        <label className="label">
          Professional Summary
        </label>
        <textarea
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          className="input-field h-32 resize-none"
          placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-500 mt-1">
          {data.summary.length}/500 characters
        </p>
      </div>
    </div>
  )
}
