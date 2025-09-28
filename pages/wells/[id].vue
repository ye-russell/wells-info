<template>
  <div class="container py-8">
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="loading-spinner"></div>
      <span class="ml-3 text-gray-600">Loading well details...</span>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600 mb-4">{{ error }}</div>
      <NuxtLink to="/wells" class="btn btn-primary">Back to Wells</NuxtLink>
    </div>

    <div v-else-if="!well" class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900 mb-2">Well not found</h3>
      <p class="text-gray-500 mb-4">The well you're looking for doesn't exist.</p>
      <NuxtLink to="/wells" class="btn btn-primary">Back to Wells</NuxtLink>
    </div>

    <div v-else>
      <!-- Page header -->
      <div class="page-header">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/wells" class="text-gray-400 hover:text-gray-600 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="page-title">{{ well.name }}</h1>
              <p class="page-description">{{ well.description || 'Well details and file management' }}</p>
            </div>
          </div>
          <div class="flex space-x-3">
            <NuxtLink :to="`/wells/${well.id}/edit`" class="btn btn-secondary">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Well Information Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Basic Information -->
        <div class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <dl class="space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Well Name</dt>
              <dd class="text-sm text-gray-900">{{ well.name }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Oilfield</dt>
              <dd class="text-sm text-gray-900">
                <NuxtLink 
                  :to="`/oilfields/${well.oilfieldId}`"
                  class="text-blue-600 hover:text-blue-800"
                >
                  {{ oilfieldName }}
                </NuxtLink>
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Well Type</dt>
              <dd class="text-sm text-gray-900 capitalize">{{ well.wellType }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Status</dt>
              <dd>
                <span :class="['status-badge', `status-${well.status}`]">
                  {{ well.status }}
                </span>
              </dd>
            </div>
            <div v-if="well.targetFormation">
              <dt class="text-sm font-medium text-gray-500">Target Formation</dt>
              <dd class="text-sm text-gray-900">{{ well.targetFormation }}</dd>
            </div>
          </dl>
        </div>

        <!-- Technical Details -->
        <div class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Technical Details</h3>
          <dl class="space-y-3">
            <div v-if="well.totalDepth">
              <dt class="text-sm font-medium text-gray-500">Total Depth</dt>
              <dd class="text-sm text-gray-900">{{ well.totalDepth.toLocaleString() }} ft</dd>
            </div>
            <div v-if="well.surfaceElevation">
              <dt class="text-sm font-medium text-gray-500">Surface Elevation</dt>
              <dd class="text-sm text-gray-900">{{ well.surfaceElevation.toLocaleString() }} ft</dd>
            </div>
            <div v-if="well.coordinates">
              <dt class="text-sm font-medium text-gray-500">Coordinates</dt>
              <dd class="text-sm text-gray-900">
                {{ well.coordinates.latitude.toFixed(6) }}, {{ well.coordinates.longitude.toFixed(6) }}
              </dd>
            </div>
            <div v-if="well.drillingDate">
              <dt class="text-sm font-medium text-gray-500">Drilling Date</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(well.drillingDate) }}</dd>
            </div>
            <div v-if="well.completionDate">
              <dt class="text-sm font-medium text-gray-500">Completion Date</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(well.completionDate) }}</dd>
            </div>
          </dl>
        </div>

        <!-- Production Data -->
        <div class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Production Data</h3>
          <dl class="space-y-3">
            <div v-if="well.dailyProduction">
              <dt class="text-sm font-medium text-gray-500">Daily Production</dt>
              <dd class="text-sm text-gray-900">{{ well.dailyProduction }} bbl/day</dd>
            </div>
            <div v-if="well.cumulativeProduction">
              <dt class="text-sm font-medium text-gray-500">Cumulative Production</dt>
              <dd class="text-sm text-gray-900">{{ well.cumulativeProduction.toLocaleString() }} bbl</dd>
            </div>
            <div v-if="well.waterCut">
              <dt class="text-sm font-medium text-gray-500">Water Cut</dt>
              <dd class="text-sm text-gray-900">{{ well.waterCut }}%</dd>
            </div>
            <div v-if="well.gasOilRatio">
              <dt class="text-sm font-medium text-gray-500">Gas-Oil Ratio</dt>
              <dd class="text-sm text-gray-900">{{ well.gasOilRatio }} scf/bbl</dd>
            </div>
            <div v-if="well.lastInspectionDate">
              <dt class="text-sm font-medium text-gray-500">Last Inspection</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(well.lastInspectionDate) }}</dd>
            </div>
          </dl>
          <div v-if="!well.dailyProduction && !well.cumulativeProduction && !well.waterCut && !well.gasOilRatio" class="text-sm text-gray-500 italic">
            No production data available
          </div>
        </div>
      </div>

      <!-- File Management Section -->
      <WellFileManager :well-id="well.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Well Details'
})

// Get route params
const route = useRoute()
const wellId = route.params.id as string

// Use composables
const { wells, isLoading, error, getWellById } = useWells()
const { oilfields } = useOilfields()

// Computed properties
const well = computed(() => getWellById(wellId))

const oilfieldName = computed(() => {
  if (!well.value) return ''
  const oilfield = oilfields.value.find(o => o.id === well.value!.oilfieldId)
  return oilfield ? oilfield.name : 'Unknown Oilfield'
})

// Utility function
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Update page title when well is loaded
watchEffect(() => {
  if (well.value) {
    useHead({
      title: `${well.value.name} - Well Details`
    })
  }
})
</script>