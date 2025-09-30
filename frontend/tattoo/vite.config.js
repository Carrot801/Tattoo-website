import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Tattoo-website/",
  server: {
    proxy: {
      "/api": {
        target: "https://tattoo-website-3rg5.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
