'use client'

import { useState } from 'react'
import { Experience } from '@/types/resume'
import { Plus, Trash2, Edit3 } from 'lucide-react'

interface ExperienceSectionProps {
  data: Experience[]
  setData: (data: Experience[]) => void
}

export function ExperienceSection({ data, setData }: ExperienceSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    }
    setData([...data, newExperience])
    setEditingId(newExperience.id)
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setData(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const deleteExperience = (id: string) => {
    setData(data.filter(exp => exp.id !== id))
  }

  const addAchievement = (id: string) => {
    updateExperience(id, 'achievements', [...data.find(exp => exp.id === id)?.achievements || [], ''])
  }

  const updateAchievement = (id: string, index: number, value: string) => {
    const exp = data.find(e => e.id === id)
    if (exp) {
      const newAchievements = [...exp.achievements]
      newAchievements[index] = value
      updateExperience(id, 'achievements', newAchievements)
    }
  }

  const removeAchievement = (id: string, index: number) => {
    const exp = data.find(e => e.id === id)
    if (exp) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index)
      updateExperience(id, 'achievements', newAchievements)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={addExperience}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">
                  {exp.position || 'New Position'} at {exp.company || 'Company'}
                </h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(editingId === exp.id ? null : exp.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {editingId === exp.id && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Job Title *</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        className="input-field"
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="label">Company *</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="input-field"
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    <div>
                      <label className="label">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        className="input-field"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="label">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">End Date</label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        className="input-field"
                        disabled={exp.current}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`current-${exp.id}`} className="ml-2 text-sm text-gray-700">
                        I currently work here
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="label">Job Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      className="input-field h-24 resize-none"
                      placeholder="Describe your role and responsibilities..."
                    />
                  </div>

                  <div>
                    <label className="label">Key Achievements</label>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex space-x-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(exp.id, idx, e.target.value)}
                            className="input-field flex-1"
                            placeholder="Achievement or responsibility..."
                          />
                          <button
                            onClick={() => removeAchievement(exp.id, idx)}
                            className="p-2 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addAchievement(exp.id)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        + Add Achievement
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
