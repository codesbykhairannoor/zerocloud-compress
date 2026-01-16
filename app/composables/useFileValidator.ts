// composables/useFileValidator.ts
export const useFileValidator = () => {
  // Daftar tipe file yang diizinkan
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
  const MAX_SIZE_MB = 20 // Limit 20MB biar browser gak crash

  const validate = (file: File) => {
    // Cek Tipe
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { 
        valid: false, 
        error: `File ${file.name} bukan gambar (JPG/PNG/WebP only).` 
      }
    }

    // Cek Ukuran
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return { 
        valid: false, 
        error: `File ${file.name} terlalu besar (Max ${MAX_SIZE_MB}MB).` 
      }
    }

    return { valid: true }
  }

  return { validate }
}