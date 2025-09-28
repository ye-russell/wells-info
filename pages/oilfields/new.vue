<template>
  <div class="container py-8">
    <!-- Page header -->
    <div class="page-header">
      <div class="flex items-center">
        <NuxtLink to="/oilfields" class="text-gray-400 hover:text-gray-600 mr-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="page-title">Add New Oilfield</h1>
          <p class="page-description">Create a new oilfield record</p>
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
                Oilfield Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                placeholder="Enter oilfield name"
                class="input"
                :class="{ 'border-red-300': formErrors.name }"
              />
              <p v-if="formErrors.name" class="mt-1 text-sm text-red-600">{{ formErrors.name }}</p>
            </div>

            <div class="form-group">
              <label class="label" for="operator">
                Operator <span class="text-red-500">*</span>
              </label>
              <input
                id="operator"
                v-model="formData.operator"
                type="text"
                required
                placeholder="Enter operator company"
                class="input"
                :class="{ 'border-red-300': formErrors.operator }"
              />
              <p v-if="formErrors.operator" class="mt-1 text-sm text-red-600">{{ formErrors.operator }}</p>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="location">
              Location <span class="text-red-500">*</span>
            </label>
            <input
              id="location"
              v-model="formData.location"
              type="text"
              required
              placeholder="Enter location (e.g., West Texas, USA)"
              class="input"
              :class="{ 'border-red-300': formErrors.location }"
            />
            <p v-if="formErrors.location" class="mt-1 text-sm text-red-600">{{ formErrors.location }}</p>
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
              <label class="label" for="dateDiscovered">Discovery Date</label>
              <input
                id="dateDiscovered"
                v-model="formData.dateDiscovered"
                type="date"
                class="input"
              />
            </div>

            <div class="form-group">
              <label class="label" for="estimatedReserves">
                Estimated Reserves (barrels)
              </label>
              <input
                id="estimatedReserves"
                v-model.number="formData.estimatedReserves"
                type="number"
                min="0"
                step="1000"
                placeholder="Enter estimated reserves"
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
          <NuxtLink to="/oilfields" class="btn btn-secondary">Cancel</NuxtLink>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="isLoading || !isFormValid"
          >
            <span v-if="isLoading" class="loading-spinner w-4 h-4 mr-2"></span>
            {{ isLoading ? 'Creating...' : 'Create Oilfield' }}
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
import type { CreateOilfieldInput } from '../../../types'

// Page meta
useHead({
  title: 'Add New Oilfield'
})

// Use composables
const { createOilfield, isLoading, error, clearError } = useOilfields()
const router = useRouter()

// Form data
const formData = reactive<CreateOilfieldInput & { coordinates: { latitude?: number; longitude?: number } }>({
  name: '',
  location: '',
  operator: '',
  description: '',
  dateDiscovered: undefined,
  estimatedReserves: undefined,
  coordinates: {
    latitude: undefined,
    longitude: undefined
  }
})

// Form validation
const formErrors = reactive({
  name: '',
  location: '',
  operator: '',
  coordinates: ''
})

const successMessage = ref('')

// Computed validation
const isFormValid = computed(() => {
  return formData.name.trim() && 
         formData.location.trim() && 
         formData.operator.trim() &&
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
    formErrors.name = 'Oilfield name is required'
    isValid = false
  }

  if (!formData.location.trim()) {
    formErrors.location = 'Location is required'
    isValid = false
  }

  if (!formData.operator.trim()) {
    formErrors.operator = 'Operator is required'
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
    const submissionData: CreateOilfieldInput = {
      name: formData.name.trim(),
      location: formData.location.trim(),
      operator: formData.operator.trim(),
      description: formData.description?.trim() || undefined,
      dateDiscovered: formData.dateDiscovered ? new Date(formData.dateDiscovered) : undefined,
      estimatedReserves: formData.estimatedReserves || undefined
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

    const newOilfield = await createOilfield(submissionData)
    
    successMessage.value = 'Oilfield created successfully!'
    
    // Redirect to the new oilfield's detail page after a short delay
    setTimeout(() => {
      router.push(`/oilfields/${newOilfield.id}`)
    }, 1500)
    
  } catch (err) {
    console.error('Error creating oilfield:', err)
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