<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { X, Info } from 'lucide-vue-next'
import { formatBytes } from '~/utils/format'

const props = defineProps<{
  item: any
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const sliderPos = ref(50) // Posisi garis tengah (50%)
const compressedUrl = ref('')

onMounted(() => {
  if (props.item.compressed) {
    compressedUrl.value = URL.createObjectURL(props.item.compressed)
  }
})

onUnmounted(() => {
  if (compressedUrl.value) URL.revokeObjectURL(compressedUrl.value)
})

const handleInput = (e: Event) => {
  sliderPos.value = parseInt((e.target as HTMLInputElement).value)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
    <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" @click="$emit('close')"></div>

    <div class="relative bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
      
      <div class="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
        <div class="flex items-center gap-3">
          <h3 class="font-semibold text-white truncate max-w-[200px] md:max-w-md">
            {{ item.file.name }}
          </h3>
          <span class="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full font-mono">
            {{ $t('preview.comparison') }}
          </span>
        </div>
        <button @click="$emit('close')" class="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        
        <img :src="item.preview" class="absolute inset-0 w-full h-full object-contain" />
        <div class="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded uppercase tracking-widest font-bold">
          {{ $t('preview.original') }}
        </div>

        <div 
          class="absolute inset-0 w-full h-full pointer-events-none"
          :style="{ clipPath: `inset(0 0 0 ${sliderPos}%)` }"
        >
          <img :src="compressedUrl" class="absolute inset-0 w-full h-full object-contain" />
          <div class="absolute top-4 right-4 z-10 bg-blue-600/80 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded uppercase tracking-widest font-bold">
            {{ $t('preview.compressed') }}
          </div>
        </div>

        <input 
          type="range" min="0" max="100" :value="sliderPos" 
          @input="handleInput"
          class="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-30"
        />

        <div 
          class="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          :style="{ left: `${sliderPos}%` }"
        >
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div class="flex gap-0.5">
              <div class="w-0.5 h-3 bg-slate-400"></div>
              <div class="w-0.5 h-3 bg-slate-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 grid grid-cols-2 gap-4 bg-slate-900">
        <div class="space-y-1">
          <p class="text-slate-500 text-xs uppercase tracking-wider font-bold">{{ $t('preview.size_before') }}</p>
          <p class="text-xl text-white font-semibold">{{ formatBytes(item.originalSize) }}</p>
        </div>
        <div class="space-y-1 text-right">
          <p class="text-slate-500 text-xs uppercase tracking-wider font-bold">{{ $t('preview.size_after') }}</p>
          <p class="text-xl text-emerald-400 font-bold">
            {{ formatBytes(item.compressedSize) }}
            <span class="text-sm font-normal ml-1">(-{{ Math.round((1 - item.compressedSize / item.originalSize) * 100) }}%)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  width: 2px;
}
</style>