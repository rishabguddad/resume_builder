import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePDF = async (element: HTMLElement, filename: string = 'resume.pdf') => {
  try {
    // Ensure element is fully rendered and visible
    element.style.visibility = 'visible'
    element.style.position = 'static'
    element.style.transform = 'none'
    
    // Wait a bit for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 100))

    // Create canvas from HTML element with better settings
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality for better text rendering
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      logging: false, // Disable logging for cleaner output
    })

    // Calculate dimensions for A4 format
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm (full height)
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png', 1.0) // Maximum quality

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if content is longer than one page
    let pageNumber = 1
    while (heightLeft >= 0) {
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, -(pageNumber * pageHeight), imgWidth, imgHeight)
      heightLeft -= pageHeight
      pageNumber++
    }

    // Save the PDF
    pdf.save(filename)
    
    console.log(`PDF generated successfully: ${filename}`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}
