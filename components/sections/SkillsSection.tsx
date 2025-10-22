'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface SkillsSectionProps {
  data: string[]
  setData: (data: string[]) => void
}

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Tools & Technologies',
  'Databases',
  'Cloud Platforms',
  'Soft Skills'
]

export function SkillsSection({ data, setData }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      setData([...data, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setData(data.filter(s => s !== skill))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
        <p className="text-sm text-gray-600">
          Add your technical and soft skills. These will help your resume pass ATS filters.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field flex-1"
            placeholder="e.g., JavaScript, React, Python, Leadership"
          />
          <button
            onClick={addSkill}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>

        {data.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Your Skills ({data.length})</h4>
            <div className="flex flex-wrap gap-2">
              {data.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-primary-400 hover:text-primary-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Skill Categories</h4>
          <p className="text-sm text-gray-600 mb-3">
            Consider adding skills from these categories:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skillCategories.map((category) => (
              <div key={category} className="text-sm text-gray-600 bg-white px-2 py-1 rounded border">
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
