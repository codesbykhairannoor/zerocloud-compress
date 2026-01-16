// composables/useBatchManager.ts
export const useBatchManager = () => {
  const store = useCompressionStore()
  const { compress } = useImageOptimizer() // Otot
  const { createZip } = useZip()           // Tukang Bungkus
  const { triggerDownload } = useDownload() // Kurir

  // Fungsi utama yang bakal dipanggil tombol "Process All"
  const processQueue = async () => {
    store.isProcessing = true
    
    // 1. Filter mana yang belum diproses (status 'idle')
    const queueToProcess = store.queue.filter(item => item.status === 'idle')
    
    // 2. Loop & Proses (Sequential biar RAM aman)
    for (const item of queueToProcess) {
      // Update status jadi processing
      store.updateItem(item.id, { status: 'processing' })

      // Panggil logic kompresi
      const result = await compress(item.file, store.globalSettings.quality)

      if (result.success && result.data) {
        // Simpan hasil ke store
        store.updateItem(item.id, { 
          status: 'done',
          compressed: result.data,
          compressedSize: result.data.size
        })
      } else {
        store.updateItem(item.id, { status: 'error' })
      }
    }

    store.isProcessing = false
  }

  // Fungsi buat download hasil
  const downloadAll = async () => {
    const doneItems = store.queue.filter(item => item.status === 'done' && item.compressed)

    if (doneItems.length === 0) return alert('No files processed yet!')

    // SKENARIO A: Cuma 1 File -> Download biasa
    if (doneItems.length === 1) {
      const item = doneItems[0]
      triggerDownload(item.compressed!, item.file.name)
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