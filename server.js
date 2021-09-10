import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../client/build')))
// app.use(express.static('../client/build'))

import enrichRoutes from './api/enrich/enrich.routes.js'
app.use('/api/enrich', enrichRoutes)

const port = process.env.PORT || 3030
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
