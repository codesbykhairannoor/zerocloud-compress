<script setup lang="ts">
import { useCompressionStore } from '~/stores/compression'
import { useBatchManager } from '~/composables/useBatchManager'
import { Settings2, Play, DownloadCloud, Trash2, Info } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const store = useCompressionStore()
const { processQueue, downloadAll } = useBatchManager()
const { t } = useI18n()

// Emit untuk preview modal
const emit = defineEmits(['show-preview'])

const updateQuality = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  store.updateSettings('quality', parseFloat(val))
}

// FUNGSI BARU: Cek limit sebelum eksekusi batch manager
const handleProcessWithLimit = async () => {
  // Ambil item yang bener-bener mau diproses (statusnya idle)
  const idleItems = store.queue.filter(item => item.status === 'idle')
  
  if (idleItems.length === 0) return

  // Validasi Limit dari Store
  if (!store.canProcess(idleItems.length)) {
    // Alert dibungkus i18n dengan variabel count
    alert(t('messages.limit_reached_alert', { count: store.remainingLimit }))
    store.upgradeToPro()
    return
  }

  // Jika lolos, jalankan fungsi dari composable
  await processQueue()
}
</script>

<template>
  <div v-if="store.queue.length > 0" class="w-full max-w-2xl mt-8 space-y-6">
    
    <div v-if="store.userStatus === 'free'" class="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-xs">
      <Info class="w-3.5 h-3.5" />
      <span>{{ $t('messages.remaining_quota', { count: store.remainingLimit }) }}</span>
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
      <div class="space-y-1 flex-1">
        <div class="flex items-center gap-2 text-slate-200 font-medium">
          <Settings2 class="w-4 h-4 text-blue-500" />
          {{ $t('manager.quality') }} {{ Math.round(store.globalSettings.quality * 100) }}%
        </div>
        <input 
          type="range" min="0.1" max="1" step="0.1" 
          :value="store.globalSettings.quality"
          @input="updateQuality"
          class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div class="flex items-center gap-2">
        <button 
          @click="handleProcessWithLimit"
          :disabled="store.isProcessing"
          class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all"
        >
          <Play class="w-4 h-4 fill-current" />
          {{ $t('manager.process') }}
        </button>
        
        <button 
          @click="downloadAll"
          class="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
          :title="$t('manager.download_zip')"
        >
          <DownloadCloud class="w-5 h-5" />
        </button>

        <button @click="store.clearAll" class="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors px-2">
          <Trash2 class="w-3 h-3" />
          {{ $t('manager.clear_all') }}
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <ImageCard 
        v-for="item in store.queue" 
        :key="item.id" 
        :item="item"
        @preview="(data) => $emit('show-preview', data)" 
      />
    </div>

  </div>
</template>