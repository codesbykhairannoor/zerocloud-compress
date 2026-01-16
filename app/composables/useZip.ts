// composables/useZip.ts
import JSZip from 'jszip'

export const useZip = () => {
  
  const createZip = async (files: { name: string, data: Blob }[]) => {
    const zip = new JSZip()

    // Masukin setiap file ke dalam calon zip
    files.forEach(file => {
      zip.file(file.name, file.data)
    })

    // Generate file zip fisiknya
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    
    return zipBlob
  }

  return { createZip }
}