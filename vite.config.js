import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: [
    '**/*.doc',
    '**/*.docx',
    '**/*.pdf',
    '**/*.xls',
    '**/*.xlsx',
    '**/*.csv',
    '**/*.txt',
    '**/*.json'
  ],
})