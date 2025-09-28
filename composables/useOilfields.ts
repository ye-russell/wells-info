// Composable for managing oilfields data and operations
import { ref, computed, readonly, onMounted } from 'vue'
import type { Oilfield, CreateOilfieldInput, UpdateOilfieldInput } from '../types'

export const useOilfields = () => {
  // Reactive state for oilfields
  const oilfields = ref<Oilfield[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Mock data for development - replace with API calls
  const mockOilfields: Oilfield[] = [
    {
      id: '1',
      name: 'Permian Basin Field A',
      location: 'West Texas, USA',
      description: 'Major shale oil and gas field in the Permian Basin',
      operator: 'ConocoPhillips',
      dateDiscovered: new Date('2015-03-15'),
      estimatedReserves: 2500000,
      status: 'active',
      coordinates: { latitude: 31.8457, longitude: -102.3676 },
      createdAt: new Date('2020-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Eagle Ford South',
      location: 'South Texas, USA',
      description: 'Eagle Ford Shale formation development',
      operator: 'ExxonMobil',
      dateDiscovered: new Date('2016-08-22'),
      estimatedReserves: 1800000,
      status: 'active',
      coordinates: { latitude: 28.7041, longitude: -98.8735 },
      createdAt: new Date('2020-05-20'),
      updatedAt: new Date('2024-02-10')
    },
    {
      id: '3',
      name: 'Bakken East Block',
      location: 'North Dakota, USA',
      description: 'Bakken formation unconventional oil field',
      operator: 'Continental Resources',
      dateDiscovered: new Date('2017-11-10'),
      estimatedReserves: 3200000,
      status: 'planned',
      coordinates: { latitude: 47.7511, longitude: -102.7796 },
      createdAt: new Date('2021-03-08'),
      updatedAt: new Date('2024-01-20')
    }
  ]

  // Initialize with mock data
  const initializeOilfields = () => {
    if (oilfields.value.length === 0) {
      oilfields.value = [...mockOilfields]
    }
  }

  // Fetch all oilfields
  const fetchOilfields = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      oilfields.value = [...mockOilfields]
    } catch (err) {
      error.value = 'Failed to fetch oilfields'
      console.error('Error fetching oilfields:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Get oilfield by ID
  const getOilfieldById = (id: string): Oilfield | undefined => {
    return oilfields.value.find((oilfield: Oilfield) => oilfield.id === id)
  }

  // Create new oilfield
  const createOilfield = async (input: CreateOilfieldInput): Promise<Oilfield> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newOilfield: Oilfield = {
        id: Date.now().toString(),
        ...input,
        status: 'planned',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      oilfields.value.push(newOilfield)
      return newOilfield
    } catch (err) {
      error.value = 'Failed to create oilfield'
      console.error('Error creating oilfield:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update existing oilfield
  const updateOilfield = async (input: UpdateOilfieldInput): Promise<Oilfield> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const index = oilfields.value.findIndex((oilfield: Oilfield) => oilfield.id === input.id)
      if (index === -1) {
        throw new Error('Oilfield not found')
      }

      const updatedOilfield: Oilfield = {
        ...oilfields.value[index],
        ...input,
        updatedAt: new Date()
      }

      oilfields.value[index] = updatedOilfield
      return updatedOilfield
    } catch (err) {
      error.value = 'Failed to update oilfield'
      console.error('Error updating oilfield:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete oilfield
  const deleteOilfield = async (id: string): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const index = oilfields.value.findIndex((oilfield: Oilfield) => oilfield.id === id)
      if (index === -1) {
        throw new Error('Oilfield not found')
      }

      oilfields.value.splice(index, 1)
    } catch (err) {
      error.value = 'Failed to delete oilfield'
      console.error('Error deleting oilfield:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Get oilfields statistics
  const getStatistics = computed(() => {
    const total = oilfields.value.length
    const active = oilfields.value.filter((f: Oilfield) => f.status === 'active').length
    const planned = oilfields.value.filter((f: Oilfield) => f.status === 'planned').length
    const inactive = oilfields.value.filter((f: Oilfield) => f.status === 'inactive').length
    const totalReserves = oilfields.value.reduce((sum: number, f: Oilfield) => sum + (f.estimatedReserves || 0), 0)

    return {
      total,
      active,
      planned,
      inactive,
      totalReserves
    }
  })

  // Search and filter oilfields
  const searchOilfields = (query: string, status?: string) => {
    return oilfields.value.filter((oilfield: Oilfield) => {
      const matchesQuery = !query || 
        oilfield.name.toLowerCase().includes(query.toLowerCase()) ||
        oilfield.location.toLowerCase().includes(query.toLowerCase()) ||
        oilfield.operator.toLowerCase().includes(query.toLowerCase())
      
      const matchesStatus = !status || oilfield.status === status

      return matchesQuery && matchesStatus
    })
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  // Initialize data on first use
  onMounted(() => {
    initializeOilfields()
  })

  return {
    // State
    oilfields: readonly(oilfields),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Actions
    fetchOilfields,
    getOilfieldById,
    createOilfield,
    updateOilfield,
    deleteOilfield,
    searchOilfields,
    clearError,

    // Computed
    statistics: getStatistics
  }
}