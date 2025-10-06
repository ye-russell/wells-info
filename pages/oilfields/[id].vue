<template>
  <div class="container py-8">
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="loading-spinner"></div>
      <span class="ml-3 text-gray-600">Loading oilfield details...</span>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600 mb-4">{{ error }}</div>
      <NuxtLink to="/oilfields" class="btn btn-primary">Back to Oilfields</NuxtLink>
    </div>

    <div v-else-if="!oilfield" class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900 mb-2">Oilfield not found</h3>
      <p class="text-gray-500 mb-4">The oilfield you're looking for doesn't exist.</p>
      <NuxtLink to="/oilfields" class="btn btn-primary">Back to Oilfields</NuxtLink>
    </div>

    <div v-else>
      <!-- Page header -->
      <div class="page-header">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/oilfields" class="text-gray-400 hover:text-gray-600 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="page-title">{{ oilfield.name }}</h1>
              <p class="page-description">{{ oilfield.description || 'Oilfield details and well management' }}</p>
            </div>
          </div>
          <div class="flex space-x-3">
            <NuxtLink :to="`/oilfields/${oilfield.id}/edit`" class="btn btn-secondary">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Oilfield
            </NuxtLink>
            <button @click="confirmDelete" class="btn btn-danger">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Oilfield Information -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Main Details -->
        <div class="lg:col-span-2">
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Oilfield Information</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="label">Name</label>
                <div class="input-display">{{ oilfield.name }}</div>
              </div>
              
              <div>
                <label class="label">Location</label>
                <div class="input-display">{{ oilfield.location }}</div>
              </div>
              
              <div>
                <label class="label">Operator</label>
                <div class="input-display">{{ oilfield.operator }}</div>
              </div>
              
              <div>
                <label class="label">Status</label>
                <span :class="['status-badge', `status-${oilfield.status}`]">
                  {{ oilfield.status }}
                </span>
              </div>
              
              <div>
                <label class="label">Estimated Reserves</label>
                <div class="input-display">
                  {{ oilfield.estimatedReserves ? formatNumber(oilfield.estimatedReserves) + ' bbl' : 'Not specified' }}
                </div>
              </div>
              
              <div>
                <label class="label">Discovery Date</label>
                <div class="input-display">
                  {{ oilfield.discoveryDate ? formatDate(oilfield.discoveryDate) : 'Not specified' }}
                </div>
              </div>
            </div>
            
            <div v-if="oilfield.description" class="mt-6">
              <label class="label">Description</label>
              <div class="input-display">{{ oilfield.description }}</div>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Total Wells</span>
                <span class="font-medium">{{ wellStats.total }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Active Wells</span>
                <span class="font-medium text-green-600">{{ wellStats.active }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Planned Wells</span>
                <span class="font-medium text-blue-600">{{ wellStats.planned }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Completed Wells</span>
                <span class="font-medium text-purple-600">{{ wellStats.completed }}</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div class="text-center py-4">
              <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-gray-500">Activity tracking coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wells Section -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Wells in {{ oilfield.name }}</h2>
          <NuxtLink :to="`/wells/new?oilfield=${oilfield.id}`" class="btn btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Well
          </NuxtLink>
        </div>

        <div v-if="isLoadingWells" class="flex items-center justify-center py-8">
          <div class="loading-spinner"></div>
          <span class="ml-3 text-gray-600">Loading wells...</span>
        </div>

        <div v-else-if="oilfieldWells.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No wells found</h3>
          <p class="text-gray-500 mb-4">Get started by adding the first well to this oilfield.</p>
          <NuxtLink :to="`/wells/new?oilfield=${oilfield.id}`" class="btn btn-primary">
            Add Well
          </NuxtLink>
        </div>

        <div v-else class="table-container">
          <table class="table">
            <thead class="table-header">
              <tr>
                <th class="table-header-cell">Name</th>
                <th class="table-header-cell">Type</th>
                <th class="table-header-cell">Status</th>
                <th class="table-header-cell">Depth</th>
                <th class="table-header-cell">Updated</th>
                <th class="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="well in oilfieldWells" :key="well.id" class="table-row">
                <td class="table-cell">
                  <div>
                    <div class="font-medium text-gray-900">{{ well.name }}</div>
                    <div v-if="well.description" class="text-sm text-gray-500 max-w-xs truncate">
                      {{ well.description }}
                    </div>
                  </div>
                </td>
                <td class="table-cell capitalize">{{ well.type }}</td>
                <td class="table-cell">
                  <span :class="['status-badge', `status-${well.status}`]">
                    {{ well.status }}
                  </span>
                </td>
                <td class="table-cell">
                  {{ well.plannedDepth ? well.plannedDepth.toLocaleString() + ' ft' : '-' }}
                </td>
                <td class="table-cell text-gray-500">
                  {{ formatDate(well.updatedAt) }}
                </td>
                <td class="table-cell">
                  <div class="flex items-center space-x-2">
                    <NuxtLink 
                      :to="`/wells/${well.id}`" 
                      class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </NuxtLink>
                    <NuxtLink 
                      :to="`/wells/${well.id}/edit`" 
                      class="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                      Edit
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Delete confirmation modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Delete Oilfield</h3>
            <div class="mt-2 px-7 py-3">
              <p class="text-sm text-gray-500">
                Are you sure you want to delete "<strong>{{ oilfield.name }}</strong>"? 
                This action cannot be undone and will also delete all associated wells and data.
              </p>
            </div>
            <div class="flex justify-center space-x-3 mt-4">
              <button @click="cancelDelete" class="btn btn-secondary">Cancel</button>
              <button @click="handleDelete" class="btn btn-danger" :disabled="isDeleting">
                <span v-if="isDeleting" class="loading-spinner w-4 h-4 mr-2"></span>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Oilfield, Well } from '../../types'

// Get route params
const route = useRoute()
const router = useRouter()
const oilfieldId = route.params.id as string

// Use composables
const { 
  oilfields, 
  isLoading, 
  error, 
  fetchOilfields, 
  deleteOilfield, 
  clearError 
} = useOilfields()

const { 
  wells, 
  isLoading: isLoadingWells, 
  fetchWells 
} = useWells()

// Reactive state
const showDeleteModal = ref(false)
const isDeleting = ref(false)

// Computed - must be defined before useHead
const oilfield = computed(() => {
  return oilfields.value.find(o => o.id === oilfieldId) || null
})

// Page meta
useHead({
  title: computed(() => oilfield.value ? `${oilfield.value.name} - Oilfield Details` : 'Oilfield Details')
})

const oilfieldWells = computed(() => {
  return wells.value.filter(well => well.oilfieldId === oilfieldId)
})

const wellStats = computed(() => {
  const wellsInOilfield = oilfieldWells.value
  return {
    total: wellsInOilfield.length,
    active: wellsInOilfield.filter(w => w.status === 'active').length,
    planned: wellsInOilfield.filter(w => w.status === 'planned').length,
    completed: wellsInOilfield.filter(w => w.status === 'completed').length,
    drilling: wellsInOilfield.filter(w => w.status === 'drilling').length
  }
})

// Delete functionality
const confirmDelete = () => {
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

const handleDelete = async () => {
  if (!oilfield.value) return
  
  isDeleting.value = true
  try {
    await deleteOilfield(oilfield.value.id)
    await router.push('/oilfields')
  } catch (err) {
    console.error('Failed to delete oilfield:', err)
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
  }
}

// Utility functions
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toLocaleString()
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    fetchOilfields(),
    fetchWells()
  ])
})

// Clear error when component unmounts
onUnmounted(() => {
  clearError()
})
</script>

<style scoped>
.input-display {
  padding: 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  color: #111827;
}
</style>