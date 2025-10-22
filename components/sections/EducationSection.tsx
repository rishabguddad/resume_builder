'use client'

import { useState } from 'react'
import { Education } from '@/types/resume'
import { Plus, Trash2, Edit3 } from 'lucide-react'

interface EducationSectionProps {
  data: Education[]
  setData: (data: Education[]) => void
}

export function EducationSection({ data, setData }: EducationSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: ['']
    }
    setData([...data, newEducation])
    setEditingId(newEducation.id)
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setData(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  const deleteEducation = (id: string) => {
    setData(data.filter(edu => edu.id !== id))
  }

  const addAchievement = (id: string) => {
    updateEducation(id, 'achievements', [...data.find(edu => edu.id === id)?.achievements || [], ''])
  }

  const updateAchievement = (id: string, index: number, value: string) => {
    const edu = data.find(e => e.id === id)
    if (edu) {
      const newAchievements = [...edu.achievements]
      newAchievements[index] = value
      updateEducation(id, 'achievements', newAchievements)
    }
  }

  const removeAchievement = (id: string, index: number) => {
    const edu = data.find(e => e.id === id)
    if (edu) {
      const newAchievements = edu.achievements.filter((_, i) => i !== index)
      updateEducation(id, 'achievements', newAchievements)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">
                  {edu.degree || 'Degree'} in {edu.field || 'Field'} at {edu.institution || 'Institution'}
                </h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(editingId === edu.id ? null : edu.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteEducation(edu.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {editingId === edu.id && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Institution *</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="input-field"
                        placeholder="University of California"
                      />
                    </div>
                    <div>
                      <label className="label">Degree *</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="input-field"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="label">Field of Study *</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        className="input-field"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="label">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                        className="input-field"
                        placeholder="Berkeley, CA"
                      />
                    </div>
                    <div>
                      <label className="label">Start Date</label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">End Date</label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        className="input-field"
                        disabled={edu.current}
                      />
                    </div>
                    <div>
                      <label className="label">GPA (Optional)</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        className="input-field"
                        placeholder="3.8/4.0"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-edu-${edu.id}`}
                        checked={edu.current}
                        onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`current-edu-${edu.id}`} className="ml-2 text-sm text-gray-700">
                        Currently studying
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="label">Achievements & Activities</label>
                    <div className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex space-x-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(edu.id, idx, e.target.value)}
                            className="input-field flex-1"
                            placeholder="Honor roll, Dean's list, etc."
                          />
                          <button
                            onClick={() => removeAchievement(edu.id, idx)}
                            className="p-2 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addAchievement(edu.id)}
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
