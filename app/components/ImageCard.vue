<script setup lang="ts">
import { Download, Eye, Loader2, Trash2, AlertCircle } from 'lucide-vue-next'
import { useCompressionStore } from '~/stores/compression' // Import Store
import { formatBytes } from '~/utils/format'

const props = defineProps<{
  item: any
}>()

const emit = defineEmits(['preview'])
const store = useCompressionStore() // Init Store buat fungsi hapus
</script>

<template>
  <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-slate-700">
    <img :src="item.preview" class="w-16 h-16 rounded-xl object-cover border border-slate-700" />

    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-medium text-white truncate">{{ item.file.name }}</h4>
      <div class="flex items-center gap-2 mt-1">
        <span class="text-xs text-slate-500">{{ formatBytes(item.originalSize) }}</span>
        <template v-if="item.status === 'done'">
          <span class="text-xs text-slate-600">→</span>
          <span class="text-xs text-emerald-400 font-bold">{{ formatBytes(item.compressedSize) }}</span>
          <span class="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded italic">
            -{{ Math.round((1 - item.compressedSize / item.originalSize) * 100) }}%
          </span>
        </template>
      </div>
    </div>

    <div class="flex items-center gap-2">
      
      <div v-if="item.status === 'processing'" class="flex items-center gap-2 text-blue-400 text-xs font-medium bg-blue-500/10 px-3 py-1.5 rounded-full">
        <Loader2 class="w-3 h-3 animate-spin" />
        {{ $t('manager.processing') }}
      </div>

      <button 
        v-if="item.status === 'done'" 
        @click="$emit('preview', item)" 
        class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        :title="$t('preview.comparison')"
      >
        <Eye class="w-5 h-5" />
      </button>

      <button 
        @click="store.removeItem(item.id)"
        class="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
      >
        <Trash2 class="w-5 h-5" />
      </button>

      <div v-if="item.status === 'error'" class="text-red-400">
        <AlertCircle class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>