import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), '../client/build')))
} else {
	const corsOptions = {
		origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
		credentials: true,
	}
	app.use(cors(corsOptions))
}

app.get('/**', (req, res) => {
	res.sendFile(path.join(process.cwd(), '../client/build', 'index.html'))
})

import enrichRoutes from './api/enrich/enrich.routes.js'
app.use('/api/enrich', enrichRoutes)

const port = process.env.PORT || 3030
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
