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
    maxDailyLimit: 30, 
    isProcessing: false
  }),

  getters: {
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
        this.maxDailyLimit = 30

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
      this.dailyUsage++
      if (process.client) {
        localStorage.setItem('zc_usage', this.dailyUsage.toString())
      }
      return { success: true }
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

    updateSettings(key: 'quality', value: number) {
      if (key === 'quality') {
        this.globalSettings.quality = value
      }
    },

    // FUNGSI UPGRADE
    upgradeToPro() {
      if (process.client) {
        const { $i18n } = useNuxtApp()
        // Pastikan key 'messages.coming_soon' ada di file i18n lu
        alert($i18n.t('messages.coming_soon'))
      }
    }
  }
})