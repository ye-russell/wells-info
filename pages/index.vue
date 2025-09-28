<template>
  <div class="container py-8">
    <!-- Page header -->
    <div class="page-header">
      <div class="text-center">
        <h1 class="page-title">Wells Information Dashboard</h1>
        <p class="page-description">Welcome to the Wells Management System</p>
      </div>
    </div>

    <!-- Quick Navigation -->
    <div class="card">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Navigation</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink to="/oilfields" class="btn btn-primary btn-lg">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          View Oilfields
        </NuxtLink>
        <NuxtLink to="/wells" class="btn btn-success btn-lg">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          View Wells
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Dashboard',
  meta: [
    { name: 'description', content: 'Wells Information Management System Dashboard' }
  ]
})
</script>
