'use client'

import { useState } from 'react'
import { Certification } from '@/types/resume'
import { Plus, Trash2, Edit3, ExternalLink } from 'lucide-react'

interface CertificationsSectionProps {
  data: Certification[]
  setData: (data: Certification[]) => void
}

export function CertificationsSection({ data, setData }: CertificationsSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    }
    setData([...data, newCertification])
    setEditingId(newCertification.id)
  }

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    setData(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ))
  }

  const deleteCertification = (id: string) => {
    setData(data.filter(cert => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <button
          onClick={addCertification}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No certifications added yet.</p>
          <p className="text-sm">Click "Add Certification" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((cert, index) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {cert.name || 'New Certification'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {cert.issuer || 'Issuer'} • {cert.date || 'Date'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-primary-400 hover:text-primary-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setEditingId(editingId === cert.id ? null : cert.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {editingId === cert.id && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Certification Name *</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        className="input-field"
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>
                    <div>
                      <label className="label">Issuing Organization *</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        className="input-field"
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div>
                      <label className="label">Issue Date *</label>
                      <input
                        type="month"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">Credential URL (Optional)</label>
                      <input
                        type="url"
                        value={cert.url || ''}
                        onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                        className="input-field"
                        placeholder="https://aws.amazon.com/certification/"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Popular Certifications</h4>
        <p className="text-sm text-blue-700 mb-3">
          Consider adding these in-demand certifications:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            'AWS Certified Solutions Architect',
            'Google Cloud Professional',
            'Microsoft Azure Fundamentals',
            'Certified Kubernetes Administrator',
            'PMP Certification',
            'CISSP Security'
          ].map((cert) => (
            <div key={cert} className="text-sm text-blue-700 bg-white px-2 py-1 rounded border">
              {cert}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
