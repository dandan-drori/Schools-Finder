import express from 'express'
import cors from 'cors'
import path from 'path'
import { URL } from 'url'
const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
	const pathToBuild = new URL('../client/build', import.mera.url).pathname;
	app.use(express.static(pathToBuild))
} else {
	const corsOptions = {
		origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
		credentials: true,
	}
	app.use(cors(corsOptions))
}

const pathToHtml = new URL('../client/build/index.html', import.mera.url).pathname;

app.get('/**', (req, res) => {
	res.sendFile(pathToHtml)
})

import enrichRoutes from './api/enrich/enrich.routes.js'
app.use('/api/enrich', enrichRoutes)

const port = process.env.PORT || 3030
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
