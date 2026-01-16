// composables/useImageOptimizer.ts
import imageCompression from 'browser-image-compression'

export const useImageOptimizer = () => {
  
  // Fungsi murni: Input File -> Output Blob
  const compress = async (file: File, quality: number = 0.8) => {
    const options = {
      maxSizeMB: 1,           // Target ukuran (bisa diubah nanti)
      maxWidthOrHeight: 1920, // Resize kalau kegedean (opsional)
      useWebWorker: true,     // WAJIB: Biar browser gak freeze
      initialQuality: quality // Level kompresi (0.1 - 1.0)
    }

    try {
      // Proses kompresi berjalan di sini
      const compressedBlob = await imageCompression(file, options)
      
      return {
        success: true,
        data: compressedBlob
      }
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }

  return { compress }
}