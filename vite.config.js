import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-case-studies',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/case-studies' || req.url === '/case-studies/') {
            const html = fs.readFileSync(path.resolve(__dirname, 'use-cases.html'), 'utf-8')
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(html)
            return
          }
          next()
        })
      },
    },
  ],
})
