import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // ESTO ES LO NUEVO:
      // Le prohibimos a Vite buscar archivos de configuración de Babel externos
      babel: {
        babelrc: false,
        configFile: false,
      }
    })
  ],
  base: '/Page-Login/',
  
  server: {
    port: 3000,
  }
})