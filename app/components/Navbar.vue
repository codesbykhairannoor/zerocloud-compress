<script setup lang="ts">
import { useCompressionStore } from '~/stores/compression'
import { Zap, Github, ShieldCheck } from 'lucide-vue-next'

const store = useCompressionStore()
</script>

<template>
  <nav class="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <div class="flex items-center gap-2">
        <div class="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
          <ShieldCheck class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold text-lg tracking-tight text-white">
          Zero<span class="text-blue-500">Cloud</span>
        </span>
      </div>

      <div class="flex items-center gap-4">
        <ClientOnly>
        <div v-if="store.userStatus === 'free'" 
             class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium">
          <span class="text-slate-400">Daily Limit:</span>
          <span :class="store.dailyUsage >= store.maxDailyLimit ? 'text-red-400' : 'text-emerald-400'">
            {{ store.dailyUsage }} / {{ store.maxDailyLimit }} Used
          </span>
        </div>
</ClientOnly>
        <button v-if="store.userStatus === 'free'"
          @click="store.upgradeToPro()" 
          class="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-orange-500/20 active:scale-95">
          <Zap class="w-4 h-4 fill-white" />
          <span>Go Pro</span>
        </button>

        <a href="https://github.com" target="_blank" class="p-2 text-slate-400 hover:text-white transition-colors">
          <Github class="w-5 h-5" />
        </a>
      </div>
    </div>
  </nav>
</template>