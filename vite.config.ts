
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // این خط برای اجرای صحیح در GitHub Pages و پوشه‌های فرعی حیاتی است
})
