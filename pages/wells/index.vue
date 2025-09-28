<template>
  <div class="container py-8">
    <!-- Page header -->
    <div class="page-header">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title">Wells</h1>
          <p class="page-description">Manage and monitor all well operations</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <NuxtLink to="/wells/new" class="btn btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Well
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Filters and search -->
    <div class="card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="label">Search wells</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or formation..."
            class="input"
          />
        </div>
        <div>
          <label class="label">Status</label>
          <select v-model="statusFilter" class="input">
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="drilling">Drilling</option>
            <option value="completed">Completed</option>
            <option value="planned">Planned</option>
          </select>
        </div>
        <div>
          <label class="label">Well Type</label>
          <select v-model="wellTypeFilter" class="input">
            <option value="">All types</option>
            <option value="production">Production</option>
            <option value="injection">Injection</option>
            <option value="observation">Observation</option>
            <option value="exploration">Exploration</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="btn btn-secondary w-full"
            :disabled="!searchQuery && !statusFilter && !wellTypeFilter"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="card text-center">
        <div class="text-2xl font-bold text-blue-600">{{ statistics.total }}</div>
        <div class="text-sm text-gray-600">Total Wells</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-green-600">{{ statistics.active }}</div>
        <div class="text-sm text-gray-600">Active</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ statistics.drilling }}</div>
        <div class="text-sm text-gray-600">Drilling</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-purple-600">{{ formatNumber(statistics.totalProduction) }}</div>
        <div class="text-sm text-gray-600">Total Production (bbl)</div>
      </div>
    </div>

    <!-- Wells Table -->
    <div class="card">
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="loading-spinner"></div>
        <span class="ml-3 text-gray-600">Loading wells...</span>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">{{ error }}</div>
        <button @click="fetchWells" class="btn btn-primary">Retry</button>
      </div>

      <div v-else-if="filteredWells.length === 0" class="text-center py-12">
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No wells found</h3>
        <p class="text-gray-500 mb-4">
          {{ searchQuery || statusFilter || wellTypeFilter ? 'No wells match your current filters.' : 'Get started by adding your first well.' }}
        </p>
        <NuxtLink v-if="!searchQuery && !statusFilter && !wellTypeFilter" to="/wells/new" class="btn btn-primary">
          Add Well
        </NuxtLink>
      </div>

      <div v-else class="table-container">
        <table class="table">
          <thead class="table-header">
            <tr>
              <th class="table-header-cell">Well Name</th>
              <th class="table-header-cell">Oilfield</th>
              <th class="table-header-cell">Type</th>
              <th class="table-header-cell">Status</th>
              <th class="table-header-cell">Formation</th>
              <th class="table-header-cell">Total Depth</th>
              <th class="table-header-cell">Production</th>
              <th class="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="well in filteredWells" :key="well.id" class="table-row">
              <td class="table-cell">
                <div>
                  <div class="font-medium text-gray-900">{{ well.name }}</div>
                  <div v-if="well.description" class="text-sm text-gray-500 max-w-xs truncate">
                    {{ well.description }}
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <span class="text-gray-900">{{ getOilfieldName(well.oilfieldId) }}</span>
              </td>
              <td class="table-cell">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                  {{ well.wellType }}
                </span>
              </td>
              <td class="table-cell">
                <span :class="['status-badge', `status-${well.status}`]">
                  {{ well.status }}
                </span>
              </td>
              <td class="table-cell">
                <span v-if="well.targetFormation" class="text-gray-900">{{ well.targetFormation }}</span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="table-cell">
                <span v-if="well.totalDepth" class="text-gray-900">{{ well.totalDepth.toLocaleString() }} ft</span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="table-cell">
                <div v-if="well.wellType === 'production' && well.dailyProduction">
                  <div class="text-sm text-gray-900">{{ well.dailyProduction }} bbl/day</div>
                  <div class="text-xs text-gray-500">{{ formatNumber(well.cumulativeProduction || 0) }} total</div>
                </div>
                <span v-else class="text-gray-400">-</span>
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
                  <button 
                    @click="confirmDelete(well)"
                    class="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <div v-if="wellToDelete" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Delete Well</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete "<strong>{{ wellToDelete.name }}</strong>"? 
              This action cannot be undone and will also delete all associated files and data.
            </p>
          </div>
          <div class="flex justify-center space-x-3 mt-4">
            <button @click="cancelDelete" class="btn btn-secondary">Cancel</button>
            <button @click="handleDelete" class="btn btn-danger" :disabled="isLoading">
              <span v-if="isLoading" class="loading-spinner w-4 h-4 mr-2"></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Well } from '../../types'

// Page meta
useHead({
  title: 'Wells'
})

// Use composables
const { 
  wells, 
  isLoading, 
  error, 
  statistics, 
  fetchWells, 
  deleteWell, 
  searchWells,
  clearError 
} = useWells()

const { oilfields } = useOilfields()

// Reactive state
const searchQuery = ref('')
const statusFilter = ref('')
const wellTypeFilter = ref('')
const wellToDelete = ref<Well | null>(null)

// Computed filtered wells
const filteredWells = computed(() => {
  return searchWells(searchQuery.value, {
    status: statusFilter.value,
    wellType: wellTypeFilter.value
  })
})

// Helper function to get oilfield name
const getOilfieldName = (oilfieldId: string): string => {
  const oilfield = oilfields.value.find(o => o.id === oilfieldId)
  return oilfield ? oilfield.name : 'Unknown'
}

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  wellTypeFilter.value = ''
}

// Delete functionality
const confirmDelete = (well: Well) => {
  wellToDelete.value = well
}

const cancelDelete = () => {
  wellToDelete.value = null
}

const handleDelete = async () => {
  if (!wellToDelete.value) return
  
  try {
    await deleteWell(wellToDelete.value.id)
    wellToDelete.value = null
  } catch (err) {
    console.error('Failed to delete well:', err)
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

// Clear error when component unmounts
onUnmounted(() => {
  clearError()
})
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}
</style>