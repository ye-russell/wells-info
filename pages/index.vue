<template>
  <div class="container py-8">
    <!-- Page header -->
    <div class="page-header">
      <div class="text-center">
        <h1 class="page-title">Wells Information Management System</h1>
        <p class="page-description">Comprehensive platform for managing oilfield operations and well data</p>
      </div>
    </div>

    <!-- System Overview -->
    <div class="card mb-8">
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
          <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Manage Your Oil & Gas Operations</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Organize and track your oilfield locations, monitor individual wells within each field, 
          and attach important documents and data files. Everything you need to manage your 
          oil and gas operations in one centralized platform.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="text-center p-6 bg-gray-50 rounded-lg">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 flex-shrink-0">
            <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Oilfield Management</h3>
          <p class="text-gray-600 text-sm">
            Create and manage oilfield locations with detailed information about operators, 
            reserves, and operational status.
          </p>
        </div>

        <div class="text-center p-6 bg-gray-50 rounded-lg">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 flex-shrink-0">
            <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Well Tracking</h3>
          <p class="text-gray-600 text-sm">
            Monitor individual wells within each oilfield, track drilling progress, 
            production data, and maintenance schedules.
          </p>
        </div>

        <div class="text-center p-6 bg-gray-50 rounded-lg">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 flex-shrink-0">
            <svg class="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Document Management</h3>
          <p class="text-gray-600 text-sm">
            Attach and organize important files, reports, and documentation 
            for each well and oilfield operation.
          </p>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Get Started</h3>
        <p class="text-gray-600 mb-6">Begin by managing your oilfield locations. Wells and documents can be accessed within each oilfield.</p>
        <NuxtLink to="/oilfields" class="btn btn-primary btn-lg">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Manage Oilfields
        </NuxtLink>
      </div>
    </div>

    <!-- System Workflow -->
    <div class="card">
      <h3 class="text-xl font-semibold text-gray-900 mb-6 text-center">How It Works</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
            1
          </div>
          <h4 class="font-semibold text-gray-900 mb-2">Create Oilfields</h4>
          <p class="text-sm text-gray-600">
            Start by adding your oilfield locations with details about location, operator, and estimated reserves.
          </p>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
            2
          </div>
          <h4 class="font-semibold text-gray-900 mb-2">Add Wells</h4>
          <p class="text-sm text-gray-600">
            Within each oilfield, add and manage individual wells with drilling data, production metrics, and status updates.
          </p>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
            3
          </div>
          <h4 class="font-semibold text-gray-900 mb-2">Attach Files</h4>
          <p class="text-sm text-gray-600">
            Upload and organize documents, reports, logs, and certificates for each well and oilfield operation.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Dashboard',
  meta: [
    { name: 'description', content: 'Wells Information Management System - Comprehensive platform for managing oilfield operations and well data' }
  ]
})
</script>
