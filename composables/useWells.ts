// Composable for managing wells data and operations
import { ref, computed, readonly, onMounted } from 'vue'
import type { Well, CreateWellInput, UpdateWellInput, FileAttachment, UploadFileInput } from '../types'

export const useWells = () => {
  // Reactive state for wells
  const wells = ref<Well[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Mock data for development - replace with API calls
  const mockWells: Well[] = [
    {
      id: '1',
      name: 'PB-001',
      oilfieldId: '1',
      wellType: 'production',
      status: 'active',
      totalDepth: 8500,
      coordinates: { latitude: 31.8457, longitude: -102.3676 },
      surfaceElevation: 2850,
      targetFormation: 'Wolfcamp A',
      drillingDate: new Date('2020-03-15'),
      completionDate: new Date('2020-05-20'),
      lastInspectionDate: new Date('2024-01-15'),
      dailyProduction: 125,
      cumulativeProduction: 185000,
      waterCut: 15,
      gasOilRatio: 850,
      description: 'Primary production well in Permian Basin',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'PB-002',
      oilfieldId: '1',
      wellType: 'production',
      status: 'active',
      totalDepth: 9200,
      coordinates: { latitude: 31.8487, longitude: -102.3606 },
      surfaceElevation: 2860,
      targetFormation: 'Wolfcamp B',
      drillingDate: new Date('2020-06-10'),
      completionDate: new Date('2020-08-15'),
      lastInspectionDate: new Date('2024-02-01'),
      dailyProduction: 98,
      cumulativeProduction: 142000,
      waterCut: 22,
      gasOilRatio: 920,
      description: 'Secondary production well with enhanced recovery',
      createdAt: new Date('2020-04-15'),
      updatedAt: new Date('2024-02-01')
    },
    {
      id: '3',
      name: 'EF-001',
      oilfieldId: '2',
      wellType: 'production',
      status: 'drilling',
      totalDepth: 7800,
      coordinates: { latitude: 28.7041, longitude: -98.8735 },
      surfaceElevation: 520,
      targetFormation: 'Eagle Ford',
      drillingDate: new Date('2024-01-15'),
      description: 'New horizontal well in Eagle Ford formation',
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-02-10')
    },
    {
      id: '4',
      name: 'PB-INJ-001',
      oilfieldId: '1',
      wellType: 'injection',
      status: 'active',
      totalDepth: 6500,
      coordinates: { latitude: 31.8427, longitude: -102.3646 },
      surfaceElevation: 2840,
      targetFormation: 'San Andres',
      drillingDate: new Date('2021-02-20'),
      completionDate: new Date('2021-04-10'),
      lastInspectionDate: new Date('2024-01-30'),
      description: 'Water injection well for pressure maintenance',
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2024-01-30')
    }
  ]

  // Initialize with mock data
  const initializeWells = () => {
    if (wells.value.length === 0) {
      wells.value = [...mockWells]
    }
  }

  // Fetch all wells
  const fetchWells = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      wells.value = [...mockWells]
    } catch (err) {
      error.value = 'Failed to fetch wells'
      console.error('Error fetching wells:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Get well by ID
  const getWellById = (id: string): Well | undefined => {
    return wells.value.find((well: Well) => well.id === id)
  }

  // Get wells by oilfield ID
  const getWellsByOilfieldId = (oilfieldId: string): Well[] => {
    return wells.value.filter((well: Well) => well.oilfieldId === oilfieldId)
  }

  // Create new well
  const createWell = async (input: CreateWellInput): Promise<Well> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newWell: Well = {
        id: Date.now().toString(),
        ...input,
        status: 'planned',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      wells.value.push(newWell)
      return newWell
    } catch (err) {
      error.value = 'Failed to create well'
      console.error('Error creating well:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update existing well
  const updateWell = async (input: UpdateWellInput): Promise<Well> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const index = wells.value.findIndex((well: Well) => well.id === input.id)
      if (index === -1) {
        throw new Error('Well not found')
      }

      const updatedWell: Well = {
        ...wells.value[index],
        ...input,
        updatedAt: new Date()
      }

      wells.value[index] = updatedWell
      return updatedWell
    } catch (err) {
      error.value = 'Failed to update well'
      console.error('Error updating well:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete well
  const deleteWell = async (id: string): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const index = wells.value.findIndex((well: Well) => well.id === id)
      if (index === -1) {
        throw new Error('Well not found')
      }

      wells.value.splice(index, 1)
    } catch (err) {
      error.value = 'Failed to delete well'
      console.error('Error deleting well:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Get wells statistics
  const getStatistics = computed(() => {
    const total = wells.value.length
    const active = wells.value.filter((w: Well) => w.status === 'active').length
    const drilling = wells.value.filter((w: Well) => w.status === 'drilling').length
    const planned = wells.value.filter((w: Well) => w.status === 'planned').length
    const inactive = wells.value.filter((w: Well) => w.status === 'inactive').length
    const production = wells.value.filter((w: Well) => w.wellType === 'production').length
    const injection = wells.value.filter((w: Well) => w.wellType === 'injection').length
    const totalProduction = wells.value.reduce((sum: number, w: Well) => sum + (w.cumulativeProduction || 0), 0)

    return {
      total,
      active,
      drilling,
      planned,
      inactive,
      production,
      injection,
      totalProduction
    }
  })

  // Search and filter wells
  const searchWells = (query: string, filters?: { status?: string; wellType?: string; oilfieldId?: string }) => {
    return wells.value.filter((well: Well) => {
      const matchesQuery = !query || 
        well.name.toLowerCase().includes(query.toLowerCase()) ||
        well.targetFormation?.toLowerCase().includes(query.toLowerCase()) ||
        well.description?.toLowerCase().includes(query.toLowerCase())
      
      const matchesStatus = !filters?.status || well.status === filters.status
      const matchesWellType = !filters?.wellType || well.wellType === filters.wellType
      const matchesOilfield = !filters?.oilfieldId || well.oilfieldId === filters.oilfieldId

      return matchesQuery && matchesStatus && matchesWellType && matchesOilfield
    })
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  // Initialize data on first use
  onMounted(() => {
    initializeWells()
  })

  return {
    // State
    wells: readonly(wells),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Actions
    fetchWells,
    getWellById,
    getWellsByOilfieldId,
    createWell,
    updateWell,
    deleteWell,
    searchWells,
    clearError,

    // Computed
    statistics: getStatistics
  }
}

// Composable for managing file attachments for wells
export const useWellFiles = () => {
  const files = ref<FileAttachment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Mock file data
  const mockFiles: FileAttachment[] = [
    {
      id: '1',
      wellId: '1',
      name: 'well_log_PB001.pdf',
      originalName: 'PB-001 Well Log Report.pdf',
      fileType: 'pdf',
      fileSize: 2548000,
      mimeType: 'application/pdf',
      description: 'Complete well log report for PB-001',
      category: 'log',
      uploadedAt: new Date('2024-01-15'),
      uploadedBy: 'john.engineer@company.com',
      filePath: '/files/wells/1/well_log_PB001.pdf',
      isPublic: false
    },
    {
      id: '2',
      wellId: '1',
      name: 'completion_report_PB001.pdf',
      originalName: 'PB-001 Completion Report.pdf',
      fileType: 'pdf',
      fileSize: 1824000,
      mimeType: 'application/pdf',
      description: 'Well completion and testing report',
      category: 'report',
      uploadedAt: new Date('2024-01-10'),
      uploadedBy: 'sarah.geologist@company.com',
      filePath: '/files/wells/1/completion_report_PB001.pdf',
      isPublic: true
    }
  ]

  // Initialize with mock data
  const initializeFiles = () => {
    if (files.value.length === 0) {
      files.value = [...mockFiles]
    }
  }

  // Get files for a specific well
  const getFilesByWellId = (wellId: string): FileAttachment[] => {
    return files.value.filter((file: FileAttachment) => file.wellId === wellId)
  }

  // Upload file
  const uploadFile = async (input: UploadFileInput): Promise<FileAttachment> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newFile: FileAttachment = {
        id: Date.now().toString(),
        wellId: input.wellId,
        name: `${Date.now()}_${input.file.name}`,
        originalName: input.file.name,
        fileType: input.file.name.split('.').pop() || 'unknown',
        fileSize: input.file.size,
        mimeType: input.file.type,
        description: input.description,
        category: input.category,
        uploadedAt: new Date(),
        uploadedBy: 'current.user@company.com',
        filePath: `/files/wells/${input.wellId}/${Date.now()}_${input.file.name}`,
        isPublic: input.isPublic
      }

      files.value.push(newFile)
      return newFile
    } catch (err) {
      error.value = 'Failed to upload file'
      console.error('Error uploading file:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete file
  const deleteFile = async (id: string): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const index = files.value.findIndex((file: FileAttachment) => file.id === id)
      if (index === -1) {
        throw new Error('File not found')
      }

      files.value.splice(index, 1)
    } catch (err) {
      error.value = 'Failed to delete file'
      console.error('Error deleting file:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Initialize data on first use
  onMounted(() => {
    initializeFiles()
  })

  return {
    // State
    files: readonly(files),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Actions
    getFilesByWellId,
    uploadFile,
    deleteFile
  }
}