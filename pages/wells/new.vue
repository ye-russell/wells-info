<template>
  <div class="container py-8">
    <!-- Page header -->
    <div class="page-header">
      <div class="flex items-center">
        <NuxtLink to="/wells" class="text-gray-400 hover:text-gray-600 mr-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="page-title">Add New Well</h1>
          <p class="page-description">Create a new well record</p>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="card max-w-4xl">
      <form @submit.prevent="handleSubmit">
        <!-- Basic Information -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label class="label" for="name">
                Well Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                placeholder="Enter well name (e.g., PB-001)"
                class="input"
                :class="{ 'border-red-300': formErrors.name }"
              />
              <p v-if="formErrors.name" class="mt-1 text-sm text-red-600">{{ formErrors.name }}</p>
            </div>

            <div class="form-group">
              <label class="label" for="oilfieldId">
                Oilfield <span class="text-red-500">*</span>
              </label>
              <select
                id="oilfieldId"
                v-model="formData.oilfieldId"
                required
                class="input"
                :class="{ 'border-red-300': formErrors.oilfieldId }"
              >
                <option value="">Select an oilfield</option>
                <option v-for="oilfield in oilfields" :key="oilfield.id" :value="oilfield.id">
                  {{ oilfield.name }}
                </option>
              </select>
              <p v-if="formErrors.oilfieldId" class="mt-1 text-sm text-red-600">{{ formErrors.oilfieldId }}</p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="label" for="wellType">
                Well Type <span class="text-red-500">*</span>
              </label>
              <select
                id="wellType"
                v-model="formData.wellType"
                required
                class="input"
                :class="{ 'border-red-300': formErrors.wellType }"
              >
                <option value="">Select well type</option>
                <option value="production">Production</option>
                <option value="injection">Injection</option>
                <option value="observation">Observation</option>
                <option value="exploration">Exploration</option>
              </select>
              <p v-if="formErrors.wellType" class="mt-1 text-sm text-red-600">{{ formErrors.wellType }}</p>
            </div>

            <div class="form-group">
              <label class="label" for="targetFormation">Target Formation</label>
              <input
                id="targetFormation"
                v-model="formData.targetFormation"
                type="text"
                placeholder="e.g., Wolfcamp A"
                class="input"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="description">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              placeholder="Enter optional description"
              class="input"
            ></textarea>
          </div>
        </div>

        <!-- Technical Information -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Technical Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label class="label" for="totalDepth">Total Depth (ft)</label>
              <input
                id="totalDepth"
                v-model.number="formData.totalDepth"
                type="number"
                min="0"
                step="1"
                placeholder="Enter total depth"
                class="input"
              />
            </div>

            <div class="form-group">
              <label class="label" for="surfaceElevation">Surface Elevation (ft)</label>
              <input
                id="surfaceElevation"
                v-model.number="formData.surfaceElevation"
                type="number"
                step="0.1"
                placeholder="Enter surface elevation"
                class="input"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="label" for="drillingDate">Drilling Date</label>
              <input
                id="drillingDate"
                v-model="formData.drillingDate"
                type="date"
                class="input"
              />
            </div>

            <div class="form-group">
              <label class="label" for="completionDate">Completion Date</label>
              <input
                id="completionDate"
                v-model="formData.completionDate"
                type="date"
                class="input"
              />
            </div>
          </div>
        </div>

        <!-- Location Coordinates -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Coordinates (Optional)</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label class="label" for="latitude">Latitude</label>
              <input
                id="latitude"
                v-model.number="formData.coordinates.latitude"
                type="number"
                step="any"
                placeholder="e.g., 31.8457"
                class="input"
                :class="{ 'border-red-300': formErrors.coordinates }"
              />
            </div>

            <div class="form-group">
              <label class="label" for="longitude">Longitude</label>
              <input
                id="longitude"
                v-model.number="formData.coordinates.longitude"
                type="number"
                step="any"
                placeholder="e.g., -102.3676"
                class="input"
                :class="{ 'border-red-300': formErrors.coordinates }"
              />
            </div>
          </div>
          
          <p v-if="formErrors.coordinates" class="mt-1 text-sm text-red-600">{{ formErrors.coordinates }}</p>
          <p class="text-sm text-gray-500 mt-2">
            Enter both latitude and longitude, or leave both empty.
          </p>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <NuxtLink to="/wells" class="btn btn-secondary">Cancel</NuxtLink>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="isLoading || !isFormValid"
          >
            <span v-if="isLoading" class="loading-spinner w-4 h-4 mr-2"></span>
            {{ isLoading ? 'Creating...' : 'Create Well' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      {{ successMessage }}
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreateWellInput } from '../../../types'

// Page meta
useHead({
  title: 'Add New Well'
})

// Use composables
const { createWell, isLoading, error, clearError } = useWells()
const { oilfields } = useOilfields()
const router = useRouter()

// Form data
const formData = reactive<CreateWellInput & { coordinates: { latitude?: number; longitude?: number } }>({
  name: '',
  oilfieldId: '',
  wellType: 'production' as any,
  totalDepth: undefined,
  surfaceElevation: undefined,
  targetFormation: '',
  drillingDate: undefined,
  completionDate: undefined,
  description: '',
  coordinates: {
    latitude: undefined,
    longitude: undefined
  }
})

// Form validation
const formErrors = reactive({
  name: '',
  oilfieldId: '',
  wellType: '',
  coordinates: ''
})

const successMessage = ref('')

// Computed validation
const isFormValid = computed(() => {
  return formData.name.trim() && 
         formData.oilfieldId && 
         formData.wellType &&
         !Object.values(formErrors).some(error => error !== '')
})

// Validation functions
const validateForm = () => {
  // Reset errors
  Object.keys(formErrors).forEach(key => {
    formErrors[key as keyof typeof formErrors] = ''
  })

  let isValid = true

  // Required field validation
  if (!formData.name.trim()) {
    formErrors.name = 'Well name is required'
    isValid = false
  }

  if (!formData.oilfieldId) {
    formErrors.oilfieldId = 'Oilfield selection is required'
    isValid = false
  }

  if (!formData.wellType) {
    formErrors.wellType = 'Well type is required'
    isValid = false
  }

  // Coordinates validation - both or neither
  const hasLatitude = formData.coordinates.latitude !== undefined && formData.coordinates.latitude !== null && !isNaN(formData.coordinates.latitude)
  const hasLongitude = formData.coordinates.longitude !== undefined && formData.coordinates.longitude !== null && !isNaN(formData.coordinates.longitude)
  
  if (hasLatitude !== hasLongitude) {
    formErrors.coordinates = 'Please provide both latitude and longitude, or leave both empty'
    isValid = false
  }

  // Validate coordinate ranges
  if (hasLatitude && (formData.coordinates.latitude! < -90 || formData.coordinates.latitude! > 90)) {
    formErrors.coordinates = 'Latitude must be between -90 and 90 degrees'
    isValid = false
  }

  if (hasLongitude && (formData.coordinates.longitude! < -180 || formData.coordinates.longitude! > 180)) {
    formErrors.coordinates = 'Longitude must be between -180 and 180 degrees'
    isValid = false
  }

  return isValid
}

// Form submission
const handleSubmit = async () => {
  clearError()
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  try {
    // Prepare the data for submission
    const submissionData: CreateWellInput = {
      name: formData.name.trim(),
      oilfieldId: formData.oilfieldId,
      wellType: formData.wellType,
      totalDepth: formData.totalDepth || undefined,
      surfaceElevation: formData.surfaceElevation || undefined,
      targetFormation: formData.targetFormation?.trim() || undefined,
      drillingDate: formData.drillingDate ? new Date(formData.drillingDate) : undefined,
      completionDate: formData.completionDate ? new Date(formData.completionDate) : undefined,
      description: formData.description?.trim() || undefined
    }

    // Add coordinates only if both are provided
    const hasLatitude = formData.coordinates.latitude !== undefined && formData.coordinates.latitude !== null && !isNaN(formData.coordinates.latitude)
    const hasLongitude = formData.coordinates.longitude !== undefined && formData.coordinates.longitude !== null && !isNaN(formData.coordinates.longitude)
    
    if (hasLatitude && hasLongitude) {
      submissionData.coordinates = {
        latitude: formData.coordinates.latitude!,
        longitude: formData.coordinates.longitude!
      }
    }

    const newWell = await createWell(submissionData)
    
    successMessage.value = 'Well created successfully!'
    
    // Redirect to the new well's detail page after a short delay
    setTimeout(() => {
      router.push(`/wells/${newWell.id}`)
    }, 1500)
    
  } catch (err) {
    console.error('Error creating well:', err)
    // Error is handled by the composable
  }
}

// Clear error when component unmounts
onUnmounted(() => {
  clearError()
})
</script>

<style scoped>
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
}

.border-red-300 {
  border-color: #fca5a5;
}

.border-red-300:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}
</style>