<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCompressionStore } from '~/stores/compression'
import { useI18n } from 'vue-i18n'
import { Zap, ShieldCheck, Globe, ChevronDown, Check, Clock } from 'lucide-vue-next'

const store = useCompressionStore()
const { locale, setLocale } = useI18n()

// State untuk dropdown
const isLangOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Daftar 7 Bahasa (Nama Native biar user ngerti)
const languages = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文 (Mandarin)', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' }
]

// Fungsi ganti bahasa & tutup dropdown
const changeLanguage = (code: string) => {
  setLocale(code)
  isLangOpen.value = false
}

// Fitur tutup dropdown kalau klik di luar area
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isLangOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
            <span class="text-slate-400">{{ $t('nav.limit') }}</span>
            <span :class="store.dailyUsage >= store.maxDailyLimit ? 'text-red-400' : 'text-emerald-400'">
              {{ store.dailyUsage }} / {{ store.maxDailyLimit }} {{ $t('nav.used') }}
            </span>
          </div>
        </ClientOnly>

       <button 
  v-if="store.userStatus === 'free'"
  @click="store.upgradeToPro()" 
  :class="[
    'flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all active:scale-95',
    store.isComingSoon 
      ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' 
      : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20'
  ]"
>
  <Zap v-if="!store.isComingSoon" class="w-4 h-4 fill-white" />
  <Clock v-else class="w-4 h-4 animate-spin" />

  <span>
    {{ store.isComingSoon ? $t('messages.coming_soon') : $t('nav.go_pro') }}
  </span>
</button>

        <div class="relative" ref="dropdownRef">
          <button 
            @click="isLangOpen = !isLangOpen"
            class="flex items-center gap-2 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all border border-transparent hover:border-slate-800"
          >
            <Globe class="w-5 h-5" />
            <span class="text-sm font-medium uppercase hidden sm:block">{{ locale }}</span>
            <ChevronDown :class="['w-3 h-3 transition-transform', isLangOpen ? 'rotate-180' : '']" />
          </button>

          <div v-if="isLangOpen" 
               class="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            
            <button 
              v-for="lang in languages" 
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              class="w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-slate-800 transition-colors group"
              :class="locale === lang.code ? 'text-blue-400 bg-blue-500/5' : 'text-slate-300'"
            >
              <div class="flex items-center gap-3">
                <span class="text-base">{{ lang.flag }}</span>
                <span class="font-medium group-hover:text-white transition-colors">{{ lang.name }}</span>
              </div>
              <Check v-if="locale === lang.code" class="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>