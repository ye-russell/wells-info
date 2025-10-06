<template>
  <div class="container py-8">
    <!-- Breadcrumb Navigation -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        </li>
        <li>/</li>
        <li>
          <NuxtLink to="/wells" class="hover:text-blue-600">Wells</NuxtLink>
        </li>
        <li>/</li>
        <li>
          <NuxtLink :to="`/wells/${wellId}`" class="hover:text-blue-600">
            {{ well?.name || 'Well' }}
          </NuxtLink>
        </li>
        <li>/</li>
        <li class="text-gray-900">Edit</li>
      </ol>
    </nav>

    <!-- Page Header -->
    <div class="page-header mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title">Edit Well</h1>
          <p class="page-description">Update well information and data</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <NuxtLink :to="`/wells/${wellId}`" class="btn btn-secondary">
            Cancel
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="loading-spinner"></div>
      <span class="ml-3 text-gray-600">Loading well...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card bg-red-50 border-red-200 text-center py-12">
      <div class="text-red-600 mb-4">{{ error }}</div>
      <button @click="fetchWells" class="btn btn-primary">Retry</button>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!well" class="card text-center py-12">
      <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Well not found</h3>
      <p class="text-gray-500 mb-4">The well you're looking for doesn't exist or may have been deleted.</p>
      <NuxtLink to="/wells" class="btn btn-primary">Back to Wells</NuxtLink>
    </div>

    <!-- Edit Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="card">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="label">Well Name *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="input"
              placeholder="Enter well name"
            />
          </div>
          
          <div>
            <label for="wellType" class="label">Well Type *</label>
            <select id="wellType" v-model="formData.wellType" required class="input">
              <option value="production">Production</option>
              <option value="injection">Injection</option>
              <option value="observation">Observation</option>
            </select>
          </div>

          <div>
            <label for="status" class="label">Status *</label>
            <select id="status" v-model="formData.status" required class="input">
              <option value="active">Active</option>
              <option value="drilling">Drilling</option>
              <option value="planned">Planned</option>
              <option value="inactive">Inactive</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>

          <div>
            <label for="totalDepth" class="label">Total Depth (ft)</label>
            <input
              id="totalDepth"
              v-model.number="formData.totalDepth"
              type="number"
              min="0"
              class="input"
              placeholder="Enter total depth"
            />
          </div>

          <div>
            <label for="surfaceElevation" class="label">Surface Elevation (ft)</label>
            <input
              id="surfaceElevation"
              v-model.number="formData.surfaceElevation"
              type="number"
              class="input"
              placeholder="Enter surface elevation"
            />
          </div>

          <div>
            <label for="targetFormation" class="label">Target Formation</label>
            <input
              id="targetFormation"
              v-model="formData.targetFormation"
              type="text"
              class="input"
              placeholder="Enter target formation"
            />
          </div>
        </div>

        <div class="mt-6">
          <label for="description" class="label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            class="input"
            placeholder="Enter well description..."
          ></textarea>
        </div>
      </div>

      <!-- Coordinates -->
      <div class="card">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Location</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="latitude" class="label">Latitude</label>
            <input
              id="latitude"
              v-model.number="formData.coordinates.latitude"
              type="number"
              step="any"
              min="-90"
              max="90"
              class="input"
              placeholder="Enter latitude"
            />
          </div>
          
          <div>
            <label for="longitude" class="label">Longitude</label>
            <input
              id="longitude"
              v-model.number="formData.coordinates.longitude"
              type="number"
              step="any"
              min="-180"
              max="180"
              class="input"
              placeholder="Enter longitude"
            />
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="card">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Important Dates</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label for="drillingDate" class="label">Drilling Date</label>
            <input
              id="drillingDate"
              v-model="formData.drillingDate"
              type="date"
              class="input"
            />
          </div>

          <div>
            <label for="completionDate" class="label">Completion Date</label>
            <input
              id="completionDate"
              v-model="formData.completionDate"
              type="date"
              class="input"
            />
          </div>

          <div>
            <label for="lastInspectionDate" class="label">Last Inspection Date</label>
            <input
              id="lastInspectionDate"
              v-model="formData.lastInspectionDate"
              type="date"
              class="input"
            />
          </div>
        </div>
      </div>

      <!-- Production Data (for production wells) -->
      <div v-if="formData.wellType === 'production'" class="card">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Production Data</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label for="dailyProduction" class="label">Daily Production (bbl/day)</label>
            <input
              id="dailyProduction"
              v-model.number="formData.dailyProduction"
              type="number"
              min="0"
              step="0.01"
              class="input"
              placeholder="Enter daily production"
            />
          </div>

          <div>
            <label for="cumulativeProduction" class="label">Cumulative Production (bbl)</label>
            <input
              id="cumulativeProduction"
              v-model.number="formData.cumulativeProduction"
              type="number"
              min="0"
              class="input"
              placeholder="Enter cumulative production"
            />
          </div>

          <div>
            <label for="waterCut" class="label">Water Cut (%)</label>
            <input
              id="waterCut"
              v-model.number="formData.waterCut"
              type="number"
              min="0"
              max="100"
              step="0.1"
              class="input"
              placeholder="Enter water cut"
            />
          </div>

          <div>
            <label for="gasOilRatio" class="label">Gas-Oil Ratio (scf/bbl)</label>
            <input
              id="gasOilRatio"
              v-model.number="formData.gasOilRatio"
              type="number"
              min="0"
              class="input"
              placeholder="Enter GOR"
            />
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4">
        <NuxtLink :to="`/wells/${wellId}`" class="btn btn-secondary">
          Cancel
        </NuxtLink>
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="loading-spinner w-4 h-4 mr-2"></span>
          {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Well, UpdateWellInput } from '../../../types'

// Get route params
const route = useRoute()
const router = useRouter()
const wellId = route.params.id as string

// Use composables
const { 
  wells, 
  isLoading, 
  error, 
  fetchWells, 
  updateWell, 
  clearError 
} = useWells()

// Reactive state
const isSubmitting = ref(false)

// Computed
const well = computed(() => {
  return wells.value.find(w => w.id === wellId) || null
})

// Page meta
useHead({
  title: computed(() => well.value ? `Edit ${well.value.name}` : 'Edit Well')
})

// Form data
const formData = reactive({
  name: '',
  wellType: 'production' as 'production' | 'injection' | 'observation',
  status: 'planned' as 'active' | 'drilling' | 'planned' | 'inactive' | 'abandoned',
  totalDepth: 0,
  surfaceElevation: 0,
  targetFormation: '',
  description: '',
  drillingDate: '',
  completionDate: '',
  lastInspectionDate: '',
  dailyProduction: 0,
  cumulativeProduction: 0,
  waterCut: 0,
  gasOilRatio: 0,
  coordinates: {
    latitude: 0,
    longitude: 0
  }
})

// Initialize form data when well is loaded
watchEffect(() => {
  if (well.value) {
    formData.name = well.value.name
    formData.wellType = well.value.wellType
    formData.status = well.value.status
    formData.totalDepth = well.value.totalDepth || 0
    formData.surfaceElevation = well.value.surfaceElevation || 0
    formData.targetFormation = well.value.targetFormation || ''
    formData.description = well.value.description || ''
    formData.dailyProduction = well.value.dailyProduction || 0
    formData.cumulativeProduction = well.value.cumulativeProduction || 0
    formData.waterCut = well.value.waterCut || 0
    formData.gasOilRatio = well.value.gasOilRatio || 0
    formData.coordinates.latitude = well.value.coordinates?.latitude || 0
    formData.coordinates.longitude = well.value.coordinates?.longitude || 0
    
    if (well.value.drillingDate) {
      formData.drillingDate = new Date(well.value.drillingDate).toISOString().split('T')[0]
    }
    if (well.value.completionDate) {
      formData.completionDate = new Date(well.value.completionDate).toISOString().split('T')[0]
    }
    if (well.value.lastInspectionDate) {
      formData.lastInspectionDate = new Date(well.value.lastInspectionDate).toISOString().split('T')[0]
    }
  }
})

// Handle form submission
const handleSubmit = async () => {
  if (!well.value) return
  
  isSubmitting.value = true
  
  try {
    const updateData: UpdateWellInput = {
      id: well.value.id,
      name: formData.name,
      wellType: formData.wellType,
      status: formData.status,
      totalDepth: formData.totalDepth || undefined,
      surfaceElevation: formData.surfaceElevation || undefined,
      targetFormation: formData.targetFormation || undefined,
      description: formData.description || undefined,
      drillingDate: formData.drillingDate ? new Date(formData.drillingDate) : undefined,
      completionDate: formData.completionDate ? new Date(formData.completionDate) : undefined,
      lastInspectionDate: formData.lastInspectionDate ? new Date(formData.lastInspectionDate) : undefined,
      dailyProduction: formData.dailyProduction || undefined,
      cumulativeProduction: formData.cumulativeProduction || undefined,
      waterCut: formData.waterCut || undefined,
      gasOilRatio: formData.gasOilRatio || undefined,
      coordinates: {
        latitude: formData.coordinates.latitude,
        longitude: formData.coordinates.longitude
      }
    }

    await updateWell(updateData)
    
    // Navigate back to well detail page
    await router.push(`/wells/${wellId}`)
  } catch (err) {
    console.error('Failed to update well:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Clear error when component unmounts
onUnmounted(() => {
  clearError()
})
</script>