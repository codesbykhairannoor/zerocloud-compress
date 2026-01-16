// composables/useBatchManager.ts
import { useCompressionStore } from '~/stores/compression'

export const useBatchManager = () => {
  const store = useCompressionStore()
  const { compress } = useImageOptimizer() // Otot
  const { createZip } = useZip()           // Tukang Bungkus
  const { triggerDownload } = useDownload() // Kurir

  // Fungsi utama yang bakal dipanggil tombol "Process All"
  const processQueue = async () => {
    // Hindari double processing jika sedang jalan
    if (store.isProcessing) return
    
    store.isProcessing = true
    
    // 1. Filter mana yang belum diproses (status 'idle')
    const queueToProcess = store.queue.filter(item => item.status === 'idle')
    
    // 2. Loop & Proses (Sequential biar RAM aman)
    for (const item of queueToProcess) {
      // Update status jadi processing di UI
      store.updateItem(item.id, { status: 'processing' })

      try {
        // Panggil logic kompresi
        const result = await compress(item.file, store.globalSettings.quality)

        if (result.success && result.data) {
          // A. Simpan hasil ke store
          store.updateItem(item.id, { 
            status: 'done',
            compressed: result.data,
            compressedSize: result.data.size
          })

          // B. PENTING: Update limit harian HANYA jika berhasil
          // Ini yang akan mengurangi store.remainingLimit secara real-time
          store.incrementUsage()
          
        } else {
          store.updateItem(item.id, { status: 'error' })
        }
      } catch (error) {
        console.error("Compression error for file:", item.file.name, error)
        store.updateItem(item.id, { status: 'error' })
      }
    }

    store.isProcessing = false
  }

  // Fungsi buat download hasil
  const downloadAll = async () => {
    const doneItems = store.queue.filter(item => item.status === 'done' && item.compressed)

    if (doneItems.length === 0) {
        // Bisa juga diganti i18n alert jika mau
        alert('No files processed yet!')
        return
    }

    // SKENARIO A: Cuma 1 File -> Download langsung tanpa ZIP
    if (doneItems.length === 1) {
      const item = doneItems[0]
      // Tambahkan prefix 'min_' untuk menandakan itu hasil kompresi
      triggerDownload(item.compressed!, `min_${item.file.name}`)
    } 
    // SKENARIO B: Banyak File -> Jadiin ZIP
    else {
      const filesForZip = doneItems.map(item => ({
        name: `min_${item.file.name}`,
        data: item.compressed!
      }))

      const zipBlob = await createZip(filesForZip)
      triggerDownload(zipBlob, 'ZeroCloud_Images.zip')
    }
  }

  return { processQueue, downloadAll }
}