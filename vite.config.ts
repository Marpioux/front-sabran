import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Le projet est sur un montage Windows (/mnt/c) sous WSL : l'inotify natif
    // ne détecte pas les changements de fichiers. Le polling force le HMR.
    watch: { usePolling: true, interval: 200 },
  },
})
