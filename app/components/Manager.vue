<script setup lang="ts">
import { useCompressionStore } from '~/stores/compression'
import { useBatchManager } from '~/composables/useBatchManager'
import { Settings2, Play, DownloadCloud, Trash2 } from 'lucide-vue-next'

const store = useCompressionStore()
const { processQueue, downloadAll } = useBatchManager()
const emit = defineEmits(['show-preview'])
const updateQuality = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  store.updateSettings('quality', parseFloat(val))
}
</script>

<template>
  <div v-if="store.queue.length > 0" class="w-full max-w-2xl mt-8 space-y-6">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
      <div class="space-y-1 flex-1">
        <div class="flex items-center gap-2 text-slate-200 font-medium">
          <Settings2 class="w-4 h-4 text-blue-500" />
          Compression Quality: {{ Math.round(store.globalSettings.quality * 100) }}%
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
          @click="processQueue"
          :disabled="store.isProcessing"
          class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all"
        >
          <Play class="w-4 h-4 fill-current" />
          Process
        </button>
        <button 
          @click="downloadAll"
          class="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
          title="Download All (ZIP)"
        >
          <DownloadCloud class="w-5 h-5" />
        </button>

        <button @click="store.clearAll" class="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
        <Trash2 class="w-3 h-3" />
        Clear All
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