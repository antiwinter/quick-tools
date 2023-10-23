import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

let base = process.env.NODE_ENV === 'production' ? '/quick-tools/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  loader: { '.js': 'jsx' },
  base,
  define: {
    __BASE_URL__: JSON.stringify(base)
  }
})
