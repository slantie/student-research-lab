import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    host: true,        // 👈 allows access from LAN (important)
    port: 5173,        // optional (default Vite port)
    strictPort: true,  // optional (avoids auto port switching)
  },
})
