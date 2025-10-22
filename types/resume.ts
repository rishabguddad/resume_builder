export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  achievements: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate: string
  endDate: string
  current: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
}
