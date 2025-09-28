// Core data types for the Wells Information Management System

export interface Oilfield {
  id: string
  name: string
  location: string
  description?: string
  operator: string
  dateDiscovered?: Date
  estimatedReserves?: number
  status: 'active' | 'inactive' | 'planned'
  coordinates?: {
    latitude: number
    longitude: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface Well {
  id: string
  name: string
  oilfieldId: string
  wellType: 'production' | 'injection' | 'observation' | 'exploration'
  status: 'active' | 'inactive' | 'completed' | 'drilling' | 'planned'
  totalDepth?: number
  coordinates?: {
    latitude: number
    longitude: number
  }
  surfaceElevation?: number
  targetFormation?: string
  drillingDate?: Date
  completionDate?: Date
  lastInspectionDate?: Date
  dailyProduction?: number
  cumulativeProduction?: number
  waterCut?: number
  gasOilRatio?: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface FileAttachment {
  id: string
  wellId: string
  name: string
  originalName: string
  fileType: string
  fileSize: number
  mimeType: string
  description?: string
  category: 'log' | 'report' | 'certificate' | 'image' | 'document' | 'other'
  uploadedAt: Date
  uploadedBy: string
  filePath: string
  isPublic: boolean
}

export interface CreateOilfieldInput {
  name: string
  location: string
  description?: string
  operator: string
  dateDiscovered?: Date
  estimatedReserves?: number
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface UpdateOilfieldInput extends Partial<CreateOilfieldInput> {
  id: string
  status?: 'active' | 'inactive' | 'planned'
}

export interface CreateWellInput {
  name: string
  oilfieldId: string
  wellType: 'production' | 'injection' | 'observation' | 'exploration'
  totalDepth?: number
  coordinates?: {
    latitude: number
    longitude: number
  }
  surfaceElevation?: number
  targetFormation?: string
  drillingDate?: Date
  completionDate?: Date
  description?: string
}

export interface UpdateWellInput extends Partial<CreateWellInput> {
  id: string
  status?: 'active' | 'inactive' | 'completed' | 'drilling' | 'planned'
  lastInspectionDate?: Date
  dailyProduction?: number
  cumulativeProduction?: number
  waterCut?: number
  gasOilRatio?: number
}

export interface UploadFileInput {
  wellId: string
  file: File
  description?: string
  category: 'log' | 'report' | 'certificate' | 'image' | 'document' | 'other'
  isPublic: boolean
}

// UI-related types
export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
}

export interface FilterOptions {
  search?: string
  status?: string
  oilfieldId?: string
  wellType?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface PaginationOptions {
  page: number
  pageSize: number
  total: number
}