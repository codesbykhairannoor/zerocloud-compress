<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-pop">
        <div class="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap class="w-10 h-10 text-amber-500 fill-amber-500" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ $t('nav.go_pro') }}</h3>
        <p class="text-slate-400 mb-8 leading-relaxed">
          {{ $t('messages.coming_soon') }}
        </p>
        <button 
          @click="$emit('close')"
          class="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          {{ $t('common.close') || 'Oke' }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Zap } from 'lucide-vue-next'
defineProps(['isOpen'])
defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-pop { animation: pop 0.4s cubic-bezier(0.26, 0.53, 0.74, 1.48); }
@keyframes pop {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}
</style>