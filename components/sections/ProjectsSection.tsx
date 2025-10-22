'use client'

import { useState } from 'react'
import { Project } from '@/types/resume'
import { Plus, Trash2, Edit3, ExternalLink, Github } from 'lucide-react'

interface ProjectsSectionProps {
  data: Project[]
  setData: (data: Project[]) => void
}

export function ProjectsSection({ data, setData }: ProjectsSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      startDate: '',
      endDate: '',
      current: false
    }
    setData([...data, newProject])
    setEditingId(newProject.id)
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setData(data.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ))
  }

  const deleteProject = (id: string) => {
    setData(data.filter(proj => proj.id !== id))
  }

  const addTechnology = (id: string) => {
    const proj = data.find(p => p.id === id)
    if (proj) {
      updateProject(id, 'technologies', [...proj.technologies, ''])
    }
  }

  const updateTechnology = (id: string, index: number, value: string) => {
    const proj = data.find(p => p.id === id)
    if (proj) {
      const newTechnologies = [...proj.technologies]
      newTechnologies[index] = value
      updateProject(id, 'technologies', newTechnologies)
    }
  }

  const removeTechnology = (id: string, index: number) => {
    const proj = data.find(p => p.id === id)
    if (proj) {
      const newTechnologies = proj.technologies.filter((_, i) => i !== index)
      updateProject(id, 'technologies', newTechnologies)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          onClick={addProject}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((proj, index) => (
            <div key={proj.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {proj.name || 'New Project'}
                  </h4>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{proj.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(editingId === proj.id ? null : proj.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {editingId === proj.id && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Project Name *</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                        className="input-field"
                        placeholder="E-commerce Website"
                      />
                    </div>
                    <div>
                      <label className="label">Project URL</label>
                      <input
                        type="url"
                        value={proj.url || ''}
                        onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                        className="input-field"
                        placeholder="https://myproject.com"
                      />
                    </div>
                    <div>
                      <label className="label">GitHub Repository</label>
                      <input
                        type="url"
                        value={proj.github || ''}
                        onChange={(e) => updateProject(proj.id, 'github', e.target.value)}
                        className="input-field"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                    <div>
                      <label className="label">Start Date</label>
                      <input
                        type="month"
                        value={proj.startDate}
                        onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">End Date</label>
                      <input
                        type="month"
                        value={proj.endDate}
                        onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                        className="input-field"
                        disabled={proj.current}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-proj-${proj.id}`}
                        checked={proj.current}
                        onChange={(e) => updateProject(proj.id, 'current', e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`current-proj-${proj.id}`} className="ml-2 text-sm text-gray-700">
                        Currently working on this
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="label">Project Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      className="input-field h-24 resize-none"
                      placeholder="Describe what the project does and your role in it..."
                    />
                  </div>

                  <div>
                    <label className="label">Technologies Used</label>
                    <div className="space-y-2">
                      {proj.technologies.map((tech, idx) => (
                        <div key={idx} className="flex space-x-2">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => updateTechnology(proj.id, idx, e.target.value)}
                            className="input-field flex-1"
                            placeholder="React, Node.js, MongoDB..."
                          />
                          <button
                            onClick={() => removeTechnology(proj.id, idx)}
                            className="p-2 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addTechnology(proj.id)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        + Add Technology
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
