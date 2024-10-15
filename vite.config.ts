import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@api': '/src/api',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@styles': '/src/styles',
      '@ui': '/src/ui',
      '@app-types': '/src/app-app-types',
    },
  },
})
