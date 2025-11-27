import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0', // 允许外部访问
    strictPort: false // 如果端口被占用，自动尝试下一个端口
  }
})

