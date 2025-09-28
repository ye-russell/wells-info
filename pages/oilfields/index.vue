<template>
  <div class="container py-8">
    <!-- Page header -->
    <div class="page-header">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title">Oilfields</h1>
          <p class="page-description">Manage and monitor all oilfield locations</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <NuxtLink to="/oilfields/new" class="btn btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Oilfield
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Filters and search -->
    <div class="card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="label">Search oilfields</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, location, or operator..."
            class="input"
          />
        </div>
        <div>
          <label class="label">Status</label>
          <select v-model="statusFilter" class="input">
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="planned">Planned</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="btn btn-secondary w-full"
            :disabled="!searchQuery && !statusFilter"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="card text-center">
        <div class="text-2xl font-bold text-blue-600">{{ statistics.total }}</div>
        <div class="text-sm text-gray-600">Total Oilfields</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-green-600">{{ statistics.active }}</div>
        <div class="text-sm text-gray-600">Active</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-blue-600">{{ statistics.planned }}</div>
        <div class="text-sm text-gray-600">Planned</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-purple-600">{{ formatNumber(statistics.totalReserves) }}</div>
        <div class="text-sm text-gray-600">Est. Reserves (bbl)</div>
      </div>
    </div>

    <!-- Oilfields Table -->
    <div class="card">
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="loading-spinner"></div>
        <span class="ml-3 text-gray-600">Loading oilfields...</span>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">{{ error }}</div>
        <button @click="fetchOilfields" class="btn btn-primary">Retry</button>
      </div>

      <div v-else-if="filteredOilfields.length === 0" class="text-center py-12">
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No oilfields found</h3>
        <p class="text-gray-500 mb-4">
          {{ searchQuery || statusFilter ? 'No oilfields match your current filters.' : 'Get started by adding your first oilfield.' }}
        </p>
        <NuxtLink v-if="!searchQuery && !statusFilter" to="/oilfields/new" class="btn btn-primary">
          Add Oilfield
        </NuxtLink>
      </div>

      <div v-else class="table-container">
        <table class="table">
          <thead class="table-header">
            <tr>
              <th class="table-header-cell">Name</th>
              <th class="table-header-cell">Location</th>
              <th class="table-header-cell">Operator</th>
              <th class="table-header-cell">Status</th>
              <th class="table-header-cell">Est. Reserves</th>
              <th class="table-header-cell">Updated</th>
              <th class="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="oilfield in filteredOilfields" :key="oilfield.id" class="table-row">
              <td class="table-cell">
                <div>
                  <div class="font-medium text-gray-900">{{ oilfield.name }}</div>
                  <div v-if="oilfield.description" class="text-sm text-gray-500 max-w-xs truncate">
                    {{ oilfield.description }}
                  </div>
                </div>
              </td>
              <td class="table-cell text-gray-900">{{ oilfield.location }}</td>
              <td class="table-cell text-gray-900">{{ oilfield.operator }}</td>
              <td class="table-cell">
                <span :class="['status-badge', `status-${oilfield.status}`]">
                  {{ oilfield.status }}
                </span>
              </td>
              <td class="table-cell">
                <span v-if="oilfield.estimatedReserves" class="text-gray-900">
                  {{ formatNumber(oilfield.estimatedReserves) }} bbl
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="table-cell text-gray-500">
                {{ formatDate(oilfield.updatedAt) }}
              </td>
              <td class="table-cell">
                <div class="flex items-center space-x-2">
                  <NuxtLink 
                    :to="`/oilfields/${oilfield.id}`" 
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View
                  </NuxtLink>
                  <NuxtLink 
                    :to="`/oilfields/${oilfield.id}/edit`" 
                    class="text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    Edit
                  </NuxtLink>
                  <button 
                    @click="confirmDelete(oilfield)"
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
    <div v-if="oilfieldToDelete" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
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
              Are you sure you want to delete "<strong>{{ oilfieldToDelete.name }}</strong>"? 
              This action cannot be undone and will also delete all associated wells and data.
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
import type { Oilfield } from '../../types'

// Page meta
useHead({
  title: 'Oilfields'
})

// Use composables
const { 
  oilfields, 
  isLoading, 
  error, 
  statistics, 
  fetchOilfields, 
  deleteOilfield, 
  searchOilfields,
  clearError 
} = useOilfields()

// Reactive state
const searchQuery = ref('')
const statusFilter = ref('')
const oilfieldToDelete = ref<Oilfield | null>(null)

// Computed filtered oilfields
const filteredOilfields = computed(() => {
  return searchOilfields(searchQuery.value, statusFilter.value)
})

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
}

// Delete functionality
const confirmDelete = (oilfield: Oilfield) => {
  oilfieldToDelete.value = oilfield
}

const cancelDelete = () => {
  oilfieldToDelete.value = null
}

const handleDelete = async () => {
  if (!oilfieldToDelete.value) return
  
  try {
    await deleteOilfield(oilfieldToDelete.value.id)
    oilfieldToDelete.value = null
  } catch (err) {
    console.error('Failed to delete oilfield:', err)
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