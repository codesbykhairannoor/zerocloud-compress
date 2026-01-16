// app/stores/compression.ts
import { defineStore } from 'pinia'

export interface ImageItem {
  id: string
  file: File
  preview: string
  status: 'idle' | 'processing' | 'done' | 'error'
  compressed?: Blob
  compressedSize?: number
  originalSize: number
}

export const useCompressionStore = defineStore('compression', {
  state: () => ({
    queue: [] as ImageItem[],
    globalSettings: {
      quality: 0.8,
      maxWidth: 1920,
    },
    userStatus: 'free', 
    dailyUsage: 0,
    maxDailyLimit: 30, 
    isProcessing: false
  }),

  getters: {
    // Menghitung total MB yang dihemat
    totalSaved(state) {
      return state.queue.reduce((acc, item) => {
        if (item.status === 'done' && item.compressedSize) {
          return acc + (item.originalSize - item.compressedSize)
        }
        return acc
      }, 0)
    }
  },

  actions: {
    // Inisialisasi data dari LocalStorage
    initUsage() {
      if (process.client) {
        const today = new Date().toDateString()
        const storedDate = localStorage.getItem('zc_last_date')
        const storedUsage = localStorage.getItem('zc_usage')
        this.maxDailyLimit = 30

        // Jika hari berganti (misal besok buka lagi), jatah reset ke 0
        if (storedDate !== today) {
          this.dailyUsage = 0
          localStorage.setItem('zc_last_date', today)
          localStorage.setItem('zc_usage', '0')
        } else {
          // Jika hari yang sama, ambil data pemakaian terakhir
          this.dailyUsage = parseInt(storedUsage || '0')
        }
        console.log("LOGIC NEW: Limit is", this.maxDailyLimit)
      }
    },

    // Menambah file ke antrean dengan pengecekan limit
    addToQueue(file: File) {
      if (this.userStatus === 'free' && this.dailyUsage >= this.maxDailyLimit) {
        return { success: false, reason: 'limit_reached' }
      }

      const newItem: ImageItem = {
        id: Date.now() + Math.random().toString(),
        file,
        preview: URL.createObjectURL(file),
        status: 'idle',
        originalSize: file.size
      }

      this.queue.unshift(newItem)

      // Tambah hitungan pemakaian harian
      this.dailyUsage++
      if (process.client) {
        localStorage.setItem('zc_usage', this.dailyUsage.toString())
      }
      
      return { success: true }
    },

    // Hapus satu gambar dari daftar
    removeItem(id: string) {
      const index = this.queue.findIndex(item => item.id === id)
      if (index !== -1) {
        // Penting: Revoke URL supaya tidak memory leak
        URL.revokeObjectURL(this.queue[index].preview)
        this.queue.splice(index, 1)
      }
    },

    // Bersihkan semua antrean
    clearAll() {
      this.queue.forEach(item => URL.revokeObjectURL(item.preview))
      this.queue = []
    },

    // Update status per item (saat proses kompresi)
    updateItem(id: string, payload: Partial<ImageItem>) {
      const index = this.queue.findIndex(item => item.id === id)
      if (index !== -1) {
        this.queue[index] = { ...this.queue[index], ...payload }
      }
    },

    // Update setting kualitas secara global
    updateSettings(key: 'quality', value: number) {
      this.globalSettings.quality = value
    },

    // Simulasi upgrade ke PRO
    upgradeToPro() {
      this.userStatus = 'pro'
      this.maxDailyLimit = 9999
      alert('Success! You are now a Pro user with unlimited access.')
    }
  }
})