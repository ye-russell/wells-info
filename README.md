# Wells Info Management System 🛢️

A modern oil and gas well management application built with Nuxt 3, Vue 3, and Tailwind CSS.

## 🌟 Features

- **Oilfield Management**: Create, view, edit, and manage oil field locations
- **Well Tracking**: Comprehensive well data management with production metrics
- **Interactive Dashboard**: Real-time statistics and data visualization
- **File Management**: Upload and manage well-related documents
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern Tech Stack**: Built with Nuxt 3, Vue 3, and TypeScript

## 🚀 Live Demo

🔗 **[View Live Application](https://your-app-name.vercel.app)** *(Will be available after deployment)*

## 📋 Quick Start

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import the `ye-russell/wells-info` repository

2. **Configure Deployment**:
   - Framework Preset: **Nuxt.js**
   - Build Command: `npm run build`
   - Output Directory: `.output/public`
   - Install Command: `npm ci`

3. **Deploy**: Click "Deploy" and your app will be live!

### Deploy to Netlify

1. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect to GitHub and select `ye-russell/wells-info`

2. **Configure Build**:
   - Build command: `npm run build`
   - Publish directory: `.output/public`

3. **Deploy**: Click "Deploy site"

### Deploy to GitHub Pages

1. **Enable Pages**:
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

2. **Add Workflow** (create `.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm ci
         - run: npm run build
         - uses: actions/deploy-pages@v1
           with:
             artifact_name: github-pages
             path: .output/public
   ```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `NUXT_PUBLIC_APP_NAME`: Application name
- `NUXT_PUBLIC_API_BASE_URL`: API endpoint (if using external API)

## 📱 Technology Stack

- **Frontend**: Vue 3 + Nuxt 3
- **Styling**: Tailwind CSS + @nuxt/ui
- **Language**: TypeScript (strict mode)
- **Icons**: Heroicons
- **Deployment**: Vercel Edge Functions
- **Development**: Vite + HMR

## 🏗️ Project Structure

```
wells-info-app/
├── assets/css/          # Stylesheets
├── components/          # Vue components
├── composables/         # Vue composables
├── layouts/             # App layouts
├── pages/               # File-based routing
│   ├── oilfields/       # Oilfield pages
│   └── wells/           # Well pages
├── public/              # Static assets
├── types/               # TypeScript types
└── nuxt.config.ts       # Nuxt configuration
```

## 📊 MVP Features Completed

- ✅ **Home Dashboard** with statistics overview
- ✅ **Oilfield Management** (CRUD operations)
- ✅ **Well Management** (CRUD operations)  
- ✅ **Responsive Design** (mobile-first)
- ✅ **File Upload System** for wells
- ✅ **Search & Filtering** functionality
- ✅ **Navigation & Routing** (dynamic routes)
- ✅ **Error Handling** and loading states
- ✅ **Mock Data** for demonstration

## 🎯 Next Steps (Post-MVP)

- [ ] **Backend API Integration** 
- [ ] **User Authentication** 
- [ ] **Real Database** (PostgreSQL/MongoDB)
- [ ] **Data Visualization** (charts/maps)
- [ ] **Production Data Import** 
- [ ] **Advanced Reporting** 
- [ ] **Multi-tenant Support**

---

Built with ❤️ using Nuxt 3
