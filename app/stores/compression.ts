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
    isComingSoon: true,
    maxDailyLimit: 5, 
    isProcessing: false
  }),

  getters: {
    remainingLimit(state): number {
      return Math.max(0, state.maxDailyLimit - state.dailyUsage)
    },
    // Fungsi cek: Apakah jumlah item yang akan diproses masuk dalam sisa kuota?
    canProcess(state) {
      return (count: number) => {
        if (state.userStatus === 'pro') return true
        return state.dailyUsage + count <= state.maxDailyLimit
      }
    },
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
    initUsage() {
      if (process.client) {
        const today = new Date().toDateString()
        const storedDate = localStorage.getItem('zc_last_date')
        const storedUsage = localStorage.getItem('zc_usage')

        if (storedDate !== today) {
          this.dailyUsage = 0
          localStorage.setItem('zc_last_date', today)
          localStorage.setItem('zc_usage', '0')
        } else {
          this.dailyUsage = parseInt(storedUsage || '0')
        }
      }
    },

    addToQueue(file: File) {
      const newItem: ImageItem = {
        id: Date.now() + Math.random().toString(),
        file,
        preview: URL.createObjectURL(file),
        status: 'idle',
        originalSize: file.size
      }
      this.queue.unshift(newItem)
      return { success: true }
    },

    updateSettings(key: 'quality', value: number) {
      if (key === 'quality') {
        this.globalSettings.quality = value
      }
    },
    // Dipanggil setiap satu foto berhasil dikompres
    incrementUsage() {
      if (this.userStatus === 'free') {
        this.dailyUsage++
        if (process.client) {
          localStorage.setItem('zc_usage', this.dailyUsage.toString())
        }
      }
    },

    removeItem(id: string) {
      const index = this.queue.findIndex(item => item.id === id)
      if (index !== -1) {
        URL.revokeObjectURL(this.queue[index].preview)
        this.queue.splice(index, 1)
      }
    },

    clearAll() {
      this.queue.forEach(item => URL.revokeObjectURL(item.preview))
      this.queue = []
    },

    updateItem(id: string, payload: Partial<ImageItem>) {
      const index = this.queue.findIndex(item => item.id === id)
      if (index !== -1) {
        this.queue[index] = { ...this.queue[index], ...payload }
      }
    },

    upgradeToPro() {
      if (process.client) {
        const { $i18n } = useNuxtApp()
        alert($i18n.t('messages.coming_soon'))
      }
    }
  }
})