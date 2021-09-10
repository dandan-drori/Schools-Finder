import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()

app.use(express.json())
app.use(cors())
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '../client/build')))

import enrichRoutes from './api/enrich/enrich.routes.js'
app.use('/api/enrich', enrichRoutes)

const port = process.env.PORT || 3030
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
