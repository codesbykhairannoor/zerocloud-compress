<script setup lang="ts">
import { ref } from 'vue'
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-vue-next'
import { useCompressionStore } from '~/stores/compression'
import { useFileValidator } from '~/composables/useFileValidator'

const store = useCompressionStore()
const { validate } = useFileValidator()
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

// Fungsi handle file yang masuk
const handleFiles = (files: FileList | File[]) => {
  for (const file of Array.from(files)) {
    // 1. Validasi Tipe & Size
    const validation = validate(file)
    if (!validation.valid) {
      alert(validation.error)
      continue
    }

    // 2. Masukkan ke Store (sekaligus cek limit harian)
    const result = store.addToQueue(file)
    if (!result.success && result.reason === 'limit_reached') {
      alert("Daily limit reached! Upgrade to Pro for unlimited access.")
      break
    }
  }
}

// Trigger saat klik area dropzone
const onZoneClick = () => {
  fileInput.value?.click()
}

// Trigger saat input file manual (click)
const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) handleFiles(target.files)
}

// Trigger saat drag-and-drop
const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files) handleFiles(e.dataTransfer.files)
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <div 
      @click="onZoneClick"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      :class="[
        'relative group cursor-pointer transition-all duration-300 border-2 border-dashed rounded-3xl p-12 text-center',
        isDragging 
          ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
          : 'border-slate-800 hover:border-slate-600 bg-slate-900/50'
      ]"
    >
      <input 
        ref="fileInput"
        type="file" 
        multiple 
        accept="image/*" 
        class="hidden" 
        @change="onFileSelect"
      />

      <div class="flex flex-col items-center gap-4">
        <div :class="[
          'p-4 rounded-full transition-transform duration-500 group-hover:scale-110 shadow-2xl',
          isDragging ? 'bg-blue-600 text-white animate-bounce' : 'bg-slate-800 text-slate-400'
        ]">
          <Upload v-if="!isDragging" class="w-8 h-8" />
          <ImageIcon v-else class="w-8 h-8" />
        </div>

        <div>
          <h3 class="text-xl font-semibold text-white">
            {{ isDragging ? 'Drop it here!' : 'Click or Drag & Drop' }}
          </h3>
          <p class="text-slate-400 mt-1">
            PNG, JPG, or WebP (Max 20MB per file)
          </p>
        </div>

        <div class="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-[10px] uppercase tracking-widest font-bold text-slate-500 uppercase">
          <AlertCircle class="w-3 h-3" />
          100% Secure & Local Processing
        </div>
      </div>
    </div>
  </div>
</template>