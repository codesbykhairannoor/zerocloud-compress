<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCompressionStore } from '~/stores/compression'
import { ShieldCheck, Zap, Layers, Cpu } from 'lucide-vue-next' // Import Icon buat section baru

const store = useCompressionStore()
const selectedItem = ref<any>(null)
const isModalOpen = ref(false)

// Fungsi buka modal preview
const openPreview = (item: any) => {
  selectedItem.value = item
  isModalOpen.value = true
}

// Init limit harian pas web dibuka
onMounted(() => {
  store.initUsage()
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
    <Navbar />

    <main class="flex-1 w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
      
      <div class="text-center mb-12 max-w-3xl animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          {{ $t('hero.title') }} <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            {{ $t('hero.subtitle') }}
          </span>
        </h1>
        <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {{ $t('hero.description') }}
          <span class="text-slate-200 font-medium block md:inline mt-1 md:mt-0">
            {{ $t('hero.highlight') }}
          </span>
        </p>
      </div>

      <div class="w-full max-w-3xl space-y-8 mb-20">
        <Dropzone />
        
        <Manager @show-preview="openPreview" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full border-t border-slate-800/50 pt-16">
        
        <div class="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors">
          <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <h3 class="text-white font-bold text-lg mb-2">{{ $t('features.privacy_title') }}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            {{ $t('features.privacy_desc') }}
          </p>
        </div>

        <div class="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-colors">
          <div class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 text-amber-400">
            <Zap class="w-6 h-6" />
          </div>
          <h3 class="text-white font-bold text-lg mb-2">{{ $t('features.speed_title') }}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            {{ $t('features.speed_desc') }}
          </p>
        </div>

        <div class="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
          <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
            <Layers class="w-6 h-6" />
          </div>
          <h3 class="text-white font-bold text-lg mb-2">{{ $t('features.quality_title') }}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            {{ $t('features.quality_desc') }}
          </p>
        </div>

      </div>

      <div class="w-full mt-32 border-t border-slate-800/50 pt-20">
  <h2 class="text-2xl font-bold text-white mb-12 text-center tracking-tight">{{ $t('how_it_works.title') }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
    <div class="relative flex flex-col items-center text-center group">
      <div class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 mb-4 z-10 group-hover:border-blue-500/50 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.1)]">1</div>
      <div class="hidden md:block absolute top-5 left-[60%] w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent"></div>
      <h4 class="text-slate-200 font-semibold mb-2">{{ $t('how_it_works.step1_title') }}</h4>
      <p class="text-slate-400 text-sm px-4">{{ $t('how_it_works.step1_desc') }}</p>
    </div>

    <div class="relative flex flex-col items-center text-center group">
      <div class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mb-4 z-10 group-hover:border-indigo-500/50 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.1)]">2</div>
      <div class="hidden md:block absolute top-5 left-[60%] w-full h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
      <h4 class="text-slate-200 font-semibold mb-2">{{ $t('how_it_works.step2_title') }}</h4>
      <p class="text-slate-400 text-sm px-4">{{ $t('how_it_works.step2_desc') }}</p>
    </div>

    <div class="relative flex flex-col items-center text-center">
      <div class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-4 z-10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">3</div>
      <h4 class="text-slate-200 font-semibold mb-2">{{ $t('how_it_works.step3_title') }}</h4>
      <p class="text-slate-400 text-sm px-4">{{ $t('how_it_works.step3_desc') }}</p>
    </div>
  </div>
</div>

<div class="w-full mt-32 mb-20">
  <div class="bg-gradient-to-br from-slate-900/80 to-slate-950 p-8 md:p-12 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
    <div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
    
    <div class="flex flex-col md:flex-row items-center gap-10 relative z-10">
      <div class="flex-1">
        <span class="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
          {{ $t('stats.security_tag') }}
        </span>
        <h2 class="text-3xl font-bold text-white mb-4 tracking-tight">{{ $t('stats.security_title') }}</h2>
        <p class="text-slate-400 leading-relaxed text-lg">
          {{ $t('stats.security_desc') }}
        </p>
      </div>
      
      <div class="w-full md:w-auto flex flex-col gap-4">
        <div class="bg-slate-950/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div class="p-3 bg-slate-800 rounded-xl">
            <Cpu class="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div class="text-white font-mono font-bold">Client-Side</div>
            <div class="text-slate-500 text-xs uppercase tracking-tighter">{{ $t('stats.tech_label') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </main>

    <PreviewModal 
      v-if="isModalOpen" 
      :item="selectedItem" 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
    />
  </div>

  
</template>

<style scoped>
/* Animasi halus pas load */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>