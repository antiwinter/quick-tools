// Serve static files from the 'dist' directory
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import express from 'express'
import path from 'path'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(
  '/quick-tools/',
  express.static(path.join(path.resolve(__dirname), 'dist'))
)

app.listen(5173, () => {
  console.log('Server is running on http://localhost:5173/quick-tools')
})
