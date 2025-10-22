'use client'

import { useRef, useState } from 'react'
import { ResumeData } from '@/types/resume'
import { Download, Eye, FileText, Loader2 } from 'lucide-react'
import { generatePDF } from '@/utils/pdfGenerator'

export function ResumePreview({ data }: { data: ResumeData }) {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return
    
    setIsGeneratingPDF(true)
    try {
      await generatePDF(resumeRef.current, 'resume.pdf')
    } catch (error) {
      console.error('Failed to generate PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate)
    const end = current ? 'Present' : formatDate(endDate)
    return `${start} - ${end}`
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Resume Preview</h3>
        <p className="text-sm text-gray-600 mb-3">Review your resume and download as PDF</p>
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          data-download-button
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
        >
          {isGeneratingPDF ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-medium border border-gray-200 overflow-hidden">
        <div ref={resumeRef} className="p-6 bg-white max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
              {data.personalInfo.email && (
                <span>{data.personalInfo.email}</span>
              )}
              {data.personalInfo.phone && (
                <span>{data.personalInfo.phone}</span>
              )}
              {data.personalInfo.location && (
                <span>{data.personalInfo.location}</span>
              )}
              {data.personalInfo.linkedin && (
                <span>LinkedIn: {data.personalInfo.linkedin}</span>
              )}
              {data.personalInfo.website && (
                <span>Website: {data.personalInfo.website}</span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b-2 border-primary-600 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-primary-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-primary-600 font-medium">
                          {exp.company}
                          {exp.location && ` • ${exp.location}`}
                        </p>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-2">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1">
                        {exp.achievements.filter(a => a.trim()).map((achievement, idx) => (
                          <li key={idx} className="text-gray-700 text-sm">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-primary-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-primary-600 font-medium">
                          {edu.institution}
                          {edu.location && ` • ${edu.location}`}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                      </span>
                    </div>
                    {edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1">
                        {edu.achievements.filter(a => a.trim()).map((achievement, idx) => (
                          <li key={idx} className="text-gray-700 text-sm">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="border-l-4 border-primary-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {proj.name}
                        </h3>
                        {proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {proj.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {formatDateRange(proj.startDate, proj.endDate, proj.current)}
                      </span>
                    </div>
                    {proj.description && (
                      <p className="text-gray-700 text-sm">{proj.description}</p>
                    )}
                    {(proj.url || proj.github) && (
                      <div className="flex space-x-4 mt-2">
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-sm"
                          >
                            View Project
                          </a>
                        )}
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-sm"
                          >
                            View Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
                Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-primary-600 text-sm">{cert.issuer}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
                      {cert.url && (
                        <div className="mt-1">
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-xs"
                          >
                            View Credential
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
