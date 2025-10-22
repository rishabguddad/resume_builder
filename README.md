# Resume Builder - ATS Friendly Resume Creator

A modern, beautiful, and highly ATS-friendly resume builder built with Next.js 14, TypeScript, and Tailwind CSS. Create professional resumes in minutes with a clean, modern interface and download them as PDFs.

## Features

### 🎨 Modern Design
- Beautiful, responsive UI with Tailwind CSS
- Clean, professional resume templates
- Intuitive form-based interface
- Real-time preview

### 📄 ATS-Friendly
- Clean, structured layout optimized for ATS systems
- Standard section formatting
- Keyword-friendly content organization
- Professional typography and spacing

### ⚡ Latest Tech Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form management
- **Lucide React** for icons
- **jsPDF + html2canvas** for PDF generation

### 📋 Resume Sections
- **Personal Information** - Contact details, professional summary
- **Work Experience** - Job history with achievements
- **Education** - Academic background and achievements
- **Skills** - Technical and soft skills
- **Projects** - Portfolio projects with technologies
- **Certifications** - Professional certifications

### 🔧 Key Features
- Real-time form validation
- Auto-save functionality
- PDF generation with high quality
- Responsive design for all devices
- Modern UI components
- Type-safe development

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Fill in Personal Information** - Add your contact details and professional summary
2. **Add Work Experience** - Include your job history with achievements
3. **Add Education** - List your academic background
4. **Add Skills** - Include technical and soft skills
5. **Add Projects** - Showcase your portfolio projects
6. **Add Certifications** - List professional certifications
7. **Preview & Download** - Review your resume and download as PDF

## ATS Optimization

This resume builder is designed to be ATS-friendly:

- **Clean Structure** - Uses standard section headers
- **Keyword Optimization** - Encourages relevant keywords
- **Standard Formatting** - Avoids complex layouts that confuse ATS
- **Professional Typography** - Uses clean, readable fonts
- **Consistent Spacing** - Proper margins and padding
- **Standard Sections** - Follows common resume section patterns

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Generation**: jsPDF + html2canvas
- **Form Management**: React Hook Form
- **Build Tool**: Next.js built-in bundler

## Project Structure

```
resume-builder/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── ResumeForm.tsx
│   ├── ResumePreview.tsx
│   └── sections/
│       ├── PersonalInfoSection.tsx
│       ├── ExperienceSection.tsx
│       ├── EducationSection.tsx
│       ├── SkillsSection.tsx
│       ├── ProjectsSection.tsx
│       └── CertificationsSection.tsx
├── types/
│   └── resume.ts
├── utils/
│   └── pdfGenerator.ts
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js 14 and modern web technologies.
