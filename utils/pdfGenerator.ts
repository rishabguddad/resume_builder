import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePDF = async (element: HTMLElement, filename: string = 'resume.pdf') => {
  try {
    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    // Calculate dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, -pageHeight, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Save the PDF
    pdf.save(filename)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF')
  }
}
