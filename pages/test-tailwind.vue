<template>
  <div class="container py-8">
    <h1 class="text-3xl font-bold text-red-500 mb-8">Tailwind CSS Test Page</h1>
    
    <!-- Test the specific classes you mentioned -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Testing Icon Container Classes</h2>
      <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0 border-2 border-red-500">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <p class="text-center text-sm text-gray-600">Should be: 48px x 48px, light blue background, centered, round</p>
    </div>

    <!-- Test other Tailwind classes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-red-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-red-800">Red Card</h3>
        <p class="text-red-600">This should be red background</p>
      </div>
      <div class="bg-green-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-green-800">Green Card</h3>
        <p class="text-green-600">This should be green background</p>
      </div>
      <div class="bg-blue-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-800">Blue Card</h3>
        <p class="text-blue-600">This should be blue background</p>
      </div>
    </div>

    <!-- Test responsive classes -->
    <div class="bg-purple-100 p-4 rounded-lg mb-8">
      <h3 class="text-lg font-semibold text-purple-800 mb-2">Responsive Test</h3>
      <div class="hidden md:block text-purple-600">This text should only show on medium screens and up</div>
      <div class="block md:hidden text-purple-600">This text should only show on small screens</div>
    </div>

    <!-- Test flexbox classes -->
    <div class="flex items-center justify-between bg-yellow-100 p-4 rounded-lg mb-8">
      <span class="text-yellow-800">Left aligned</span>
      <span class="text-yellow-800">Right aligned</span>
    </div>

    <!-- Back link -->
    <div class="text-center">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 underline">
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Tailwind CSS Test'
})
</script>