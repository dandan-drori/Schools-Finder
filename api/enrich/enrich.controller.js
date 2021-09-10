import enrichService from './enrich.service.js'

async function enrich(req, res) {
	try {
		const { data } = req.body
		const enrichedData = await enrichService.enrich(data)
		res.json({ enrichedData })
	} catch (err) {
		console.log(err)
		res.status(500).json({ err })
	}
}

export default {
	enrich,
}
