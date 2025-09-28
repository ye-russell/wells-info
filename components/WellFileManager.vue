<template>
  <div class="space-y-6">
    <!-- Upload Section -->
    <div class="card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Upload New File</h3>
      
      <form @submit.prevent="handleUpload" class="space-y-4">
        <!-- File Input -->
        <div>
          <label class="label">Select File</label>
          <div 
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors"
            :class="{ 'border-blue-400 bg-blue-50': isDragOver }"
            @drop="handleDrop"
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
          >
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input 
                    id="file-upload" 
                    name="file-upload" 
                    type="file" 
                    class="sr-only"
                    @change="handleFileSelect"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">
                PDF, DOC, XLS, TXT, JPG, PNG up to 10MB
              </p>
              
              <!-- Selected file info -->
              <div v-if="selectedFile" class="mt-4 p-3 bg-blue-50 rounded-md">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-blue-900">{{ selectedFile.name }}</p>
                    <p class="text-xs text-blue-700">{{ formatFileSize(selectedFile.size) }}</p>
                  </div>
                  <button 
                    type="button"
                    @click="clearFile"
                    class="ml-auto text-blue-400 hover:text-blue-600"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- File Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label" for="category">Category</label>
            <select 
              id="category"
              v-model="uploadData.category"
              required
              class="input"
            >
              <option value="">Select category</option>
              <option value="log">Well Log</option>
              <option value="report">Report</option>
              <option value="certificate">Certificate</option>
              <option value="image">Image</option>
              <option value="document">Document</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="flex items-center space-x-2 pt-6">
            <input 
              id="isPublic"
              v-model="uploadData.isPublic"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="isPublic" class="text-sm font-medium text-gray-700">
              Make file publicly accessible
            </label>
          </div>
        </div>

        <div>
          <label class="label" for="description">Description (Optional)</label>
          <textarea
            id="description"
            v-model="uploadData.description"
            rows="2"
            placeholder="Enter file description..."
            class="input"
          ></textarea>
        </div>

        <!-- Upload Button -->
        <div class="flex justify-end">
          <button 
            type="submit"
            :disabled="!selectedFile || !uploadData.category || isUploading"
            class="btn btn-primary"
          >
            <span v-if="isUploading" class="loading-spinner w-4 h-4 mr-2"></span>
            {{ isUploading ? 'Uploading...' : 'Upload File' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Files List -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Attached Files</h3>
        <div class="text-sm text-gray-500">
          {{ wellFiles.length }} {{ wellFiles.length === 1 ? 'file' : 'files' }}
        </div>
      </div>

      <div v-if="isLoadingFiles" class="flex items-center justify-center py-8">
        <div class="loading-spinner"></div>
        <span class="ml-3 text-gray-600">Loading files...</span>
      </div>

      <div v-else-if="wellFiles.length === 0" class="text-center py-8">
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p class="text-gray-500">No files attached to this well yet.</p>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="file in wellFiles" 
          :key="file.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center space-x-3">
            <!-- File Icon -->
            <div class="flex-shrink-0">
              <div 
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :class="getFileTypeColor(file.fileType)"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <!-- File Info -->
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">{{ file.originalName }}</p>
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <span class="capitalize">{{ file.category }}</span>
                <span>•</span>
                <span>{{ formatFileSize(file.fileSize) }}</span>
                <span>•</span>
                <span>{{ formatDate(file.uploadedAt) }}</span>
                <span v-if="file.isPublic" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Public
                </span>
              </div>
              <p v-if="file.description" class="text-xs text-gray-600 mt-1">{{ file.description }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2">
            <button
              @click="downloadFile(file)"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Download
            </button>
            <button
              @click="confirmDeleteFile(file)"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete File Confirmation Modal -->
    <div v-if="fileToDelete" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Delete File</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete "<strong>{{ fileToDelete.originalName }}</strong>"? 
              This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-center space-x-3 mt-4">
            <button @click="cancelDeleteFile" class="btn btn-secondary">Cancel</button>
            <button @click="handleDeleteFile" class="btn btn-danger" :disabled="isLoadingFiles">
              <span v-if="isLoadingFiles" class="loading-spinner w-4 h-4 mr-2"></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="uploadError" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ uploadError }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileAttachment, UploadFileInput } from '../../types'

// Props
interface Props {
  wellId: string
}

const props = defineProps<Props>()

// Use composables
const { files, isLoading: isLoadingFiles, uploadFile, deleteFile } = useWellFiles()

// Reactive state
const selectedFile = ref<File | null>(null)
const isDragOver = ref(false)
const isUploading = ref(false)
const uploadError = ref('')
const successMessage = ref('')
const fileToDelete = ref<FileAttachment | null>(null)

const uploadData = reactive({
  category: '' as 'log' | 'report' | 'certificate' | 'image' | 'document' | 'other' | '',
  description: '',
  isPublic: false
})

// Computed
const wellFiles = computed(() => {
  return files.value.filter(file => file.wellId === props.wellId)
})

// File handling
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    selectedFile.value = event.dataTransfer.files[0]
  }
}

const clearFile = () => {
  selectedFile.value = null
}

// Upload handling
const handleUpload = async () => {
  if (!selectedFile.value || !uploadData.category) return

  // Validate file size (10MB limit)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (selectedFile.value.size > maxSize) {
    uploadError.value = 'File size must be less than 10MB'
    return
  }

  isUploading.value = true
  uploadError.value = ''
  successMessage.value = ''

  try {
    const uploadInput: UploadFileInput = {
      wellId: props.wellId,
      file: selectedFile.value,
      category: uploadData.category,
      description: uploadData.description || undefined,
      isPublic: uploadData.isPublic
    }

    await uploadFile(uploadInput)
    
    // Reset form
    selectedFile.value = null
    uploadData.category = ''
    uploadData.description = ''
    uploadData.isPublic = false
    
    successMessage.value = 'File uploaded successfully!'
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    uploadError.value = 'Failed to upload file. Please try again.'
  } finally {
    isUploading.value = false
  }
}

// Delete handling
const confirmDeleteFile = (file: FileAttachment) => {
  fileToDelete.value = file
}

const cancelDeleteFile = () => {
  fileToDelete.value = null
}

const handleDeleteFile = async () => {
  if (!fileToDelete.value) return

  try {
    await deleteFile(fileToDelete.value.id)
    fileToDelete.value = null
    successMessage.value = 'File deleted successfully!'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    uploadError.value = 'Failed to delete file. Please try again.'
  }
}

// File download (mock implementation)
const downloadFile = (file: FileAttachment) => {
  // In a real application, this would trigger a download from the server
  console.log('Downloading file:', file.originalName)
  
  // For demo purposes, show a message
  successMessage.value = `Download started for ${file.originalName}`
  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getFileTypeColor = (fileType: string): string => {
  const colorMap: Record<string, string> = {
    pdf: 'bg-red-100 text-red-600',
    doc: 'bg-blue-100 text-blue-600',
    docx: 'bg-blue-100 text-blue-600',
    xls: 'bg-green-100 text-green-600',
    xlsx: 'bg-green-100 text-green-600',
    txt: 'bg-gray-100 text-gray-600',
    jpg: 'bg-purple-100 text-purple-600',
    jpeg: 'bg-purple-100 text-purple-600',
    png: 'bg-purple-100 text-purple-600',
    gif: 'bg-purple-100 text-purple-600'
  }
  return colorMap[fileType.toLowerCase()] || 'bg-gray-100 text-gray-600'
}

// Clear messages when component unmounts
onUnmounted(() => {
  uploadError.value = ''
  successMessage.value = ''
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>