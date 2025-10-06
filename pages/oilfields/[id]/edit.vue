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
          <NuxtLink to="/oilfields" class="hover:text-blue-600">Oilfields</NuxtLink>
        </li>
        <li>/</li>
        <li>
          <NuxtLink :to="`/oilfields/${oilfieldId}`" class="hover:text-blue-600">
            {{ oilfield?.name || 'Oilfield' }}
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
          <h1 class="page-title">Edit Oilfield</h1>
          <p class="page-description">Update oilfield information and settings</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <NuxtLink :to="`/oilfields/${oilfieldId}`" class="btn btn-secondary">
            Cancel
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="loading-spinner"></div>
      <span class="ml-3 text-gray-600">Loading oilfield...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card bg-red-50 border-red-200 text-center py-12">
      <div class="text-red-600 mb-4">{{ error }}</div>
      <button @click="fetchOilfields" class="btn btn-primary">Retry</button>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!oilfield" class="card text-center py-12">
      <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Oilfield not found</h3>
      <p class="text-gray-500 mb-4">The oilfield you're looking for doesn't exist or may have been deleted.</p>
      <NuxtLink to="/oilfields" class="btn btn-primary">Back to Oilfields</NuxtLink>
    </div>

    <!-- Edit Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="card">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="label">Oilfield Name *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="input"
              placeholder="Enter oilfield name"
            />
          </div>
          
          <div>
            <label for="operator" class="label">Operator *</label>
            <input
              id="operator"
              v-model="formData.operator"
              type="text"
              required
              class="input"
              placeholder="Enter operator name"
            />
          </div>

          <div>
            <label for="location" class="label">Location *</label>
            <input
              id="location"
              v-model="formData.location"
              type="text"
              required
              class="input"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label for="status" class="label">Status *</label>
            <select id="status" v-model="formData.status" required class="input">
              <option value="active">Active</option>
              <option value="planned">Planned</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label for="dateDiscovered" class="label">Date Discovered</label>
            <input
              id="dateDiscovered"
              v-model="formData.dateDiscovered"
              type="date"
              class="input"
            />
          </div>

          <div>
            <label for="estimatedReserves" class="label">Estimated Reserves (barrels)</label>
            <input
              id="estimatedReserves"
              v-model.number="formData.estimatedReserves"
              type="number"
              min="0"
              class="input"
              placeholder="Enter estimated reserves"
            />
          </div>
        </div>

        <div class="mt-6">
          <label for="description" class="label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            class="input"
            placeholder="Enter description..."
          ></textarea>
        </div>
      </div>

      <!-- Coordinates -->
      <div class="card">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Coordinates</h2>
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

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4">
        <NuxtLink :to="`/oilfields/${oilfieldId}`" class="btn btn-secondary">
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
import type { Oilfield, UpdateOilfieldInput } from '../../../types'

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
  updateOilfield, 
  clearError 
} = useOilfields()

// Reactive state
const isSubmitting = ref(false)

// Computed
const oilfield = computed(() => {
  return oilfields.value.find(o => o.id === oilfieldId) || null
})

// Page meta
useHead({
  title: computed(() => oilfield.value ? `Edit ${oilfield.value.name}` : 'Edit Oilfield')
})

// Form data
const formData = reactive({
  name: '',
  location: '',
  operator: '',
  status: 'planned' as 'active' | 'planned' | 'inactive',
  description: '',
  dateDiscovered: '',
  estimatedReserves: 0,
  coordinates: {
    latitude: 0,
    longitude: 0
  }
})

// Initialize form data when oilfield is loaded
watchEffect(() => {
  if (oilfield.value) {
    formData.name = oilfield.value.name
    formData.location = oilfield.value.location
    formData.operator = oilfield.value.operator
    formData.status = oilfield.value.status
    formData.description = oilfield.value.description || ''
    formData.estimatedReserves = oilfield.value.estimatedReserves || 0
    formData.coordinates.latitude = oilfield.value.coordinates?.latitude || 0
    formData.coordinates.longitude = oilfield.value.coordinates?.longitude || 0
    
    if (oilfield.value.dateDiscovered) {
      formData.dateDiscovered = new Date(oilfield.value.dateDiscovered).toISOString().split('T')[0]
    }
  }
})

// Handle form submission
const handleSubmit = async () => {
  if (!oilfield.value) return
  
  isSubmitting.value = true
  
  try {
    const updateData: UpdateOilfieldInput = {
      id: oilfield.value.id,
      name: formData.name,
      location: formData.location,
      operator: formData.operator,
      status: formData.status,
      description: formData.description || undefined,
      estimatedReserves: formData.estimatedReserves || undefined,
      dateDiscovered: formData.dateDiscovered ? new Date(formData.dateDiscovered) : undefined,
      coordinates: {
        latitude: formData.coordinates.latitude,
        longitude: formData.coordinates.longitude
      }
    }

    await updateOilfield(updateData)
    
    // Navigate back to oilfield detail page
    await router.push(`/oilfields/${oilfieldId}`)
  } catch (err) {
    console.error('Failed to update oilfield:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Clear error when component unmounts
onUnmounted(() => {
  clearError()
})
</script>