<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="nav-bar">
      <div class="nav-container">
        <div class="nav-content">
          <!-- Logo -->
          <div class="nav-logo">
            <NuxtLink to="/" class="logo-link">
              <div class="logo-icon">
                <svg class="logo-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span class="logo-text">Wells Info</span>
            </NuxtLink>
          </div>

          <!-- Navigation links -->
          <div class="nav-links">
            <NuxtLink to="/" class="nav-link">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/oilfields" class="nav-link">
              Oilfields
            </NuxtLink>
            <NuxtLink to="/wells" class="nav-link">
              Wells
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (title) => title ? `${title} - Wells Info` : 'Wells Info - Oilfield Management',
  meta: [
    { name: 'description', content: 'Wells Information Management System' }
  ]
})
</script>

<style>
/* Navigation styles */
.nav-bar {
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e5e7eb;
}

.nav-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .nav-container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .nav-container {
    padding: 0 2rem;
  }
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  background-color: #2563eb;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.nav-links {
  display: none;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  color: #6b7280;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #111827;
}

.nav-link.router-link-active {
  color: #2563eb;
  background-color: #eff6ff;
}
</style>
