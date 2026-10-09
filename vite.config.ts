import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web-Kelas-XII-F/', // <--- Ganti dengan nama repo GitHub-mu!
})