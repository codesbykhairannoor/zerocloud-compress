<script setup lang="ts">
import { onMounted } from 'vue'
import { useCompressionStore } from '~/stores/compression'
const selectedItem = ref<any>(null)
const isModalOpen = ref(false)
const store = useCompressionStore()
const openPreview = (item: any) => {
  selectedItem.value = item
  isModalOpen.value = true
}
// Init Daily Limit pas load
onMounted(() => {
  store.initUsage()
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex flex-col">
    <Navbar />

    <main class="flex-1 max-w-5xl w-full mx-auto px-4 py-12 flex flex-col items-center">
      
      <div class="text-center mb-10 max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Compress Images. <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Not Privacy.
          </span>
        </h1>
        <p class="text-slate-400 text-lg">
          No server uploads. No data collection. 
          <span class="text-slate-200 font-medium">100% Client-side processing.</span>
        </p>
      </div>

      <Dropzone />

      <Manager @show-preview="openPreview" />

    </main>
    <PreviewModal 
      v-if="isModalOpen" 
      :item="selectedItem" 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
    />
  </div>
</template>