// composables/useDownload.ts
export const useDownload = () => {
  
  const triggerDownload = (blob: Blob, filename: string) => {
    // 1. Buat URL sementara dari Blob
    const url = URL.createObjectURL(blob)
    
    // 2. Buat elemen <a> fiktif
    const link = document.createElement('a')
    link.href = url
    // Tambahin prefix 'min_' biar user tau itu file hasil kompres
    link.download = `min_${filename}` 
    
    // 3. Klik otomatis elemennya
    document.body.appendChild(link)
    link.click()
    
    // 4. Bersihkan jejak (PENTING biar RAM gak bocor)
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return { triggerDownload }
}