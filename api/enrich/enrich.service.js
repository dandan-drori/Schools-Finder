const axios = require('axios')
// const BASE_URL = 'http://www.overpass-api.de/api/xapi'
const BASE_URL = 'https://overpass-api.de/api/interpreter'
const TRAIL_URL = ';out;'

async function enrich(rows) {
	const enrichedRowsPrms = rows.map(async row => {
		try {
			const Latitude = row?.Latitude || row.Lattitude
			const Longitude = row?.Longitude || row.Longtitude
			const bbox = _locationsToBoundingBox(Latitude, Longitude)
			const response = await axios.get(`${BASE_URL}?node[amenity=school](${bbox})${TRAIL_URL}`)
			if (response.status === 429) {
				throw new Error('Too Many Requests')
			}
			if (response.status === 400) {
				throw new Error('Invalid Request')
			}
			if (response.status === 200) {
				return response.data
			}
		} catch (err) {
			return err
		}
	})
	const responses = await Promise.all(enrichedRowsPrms)
	responses.forEach((row, idx) => {
		if (typeof row === 'string' && row.startsWith('<?xml')) {
			const regex = new RegExp(/node/gi)
			const matches = row.match(regex) || []
			rows[idx].Schools = Math.round(matches.length / 2)
		} else {
			rows[idx].Schools = 0
		}
	})
	return rows
}

const _locationsToBoundingBox = (latitude, longitude, padding = 0.01) => {
	let bounding_box = [null, null, null, null]
	bounding_box[0] = Math.min(bounding_box[0] || latitude, latitude) - padding
	bounding_box[1] = Math.min(bounding_box[1] || longitude, longitude) - padding
	bounding_box[2] = Math.max(bounding_box[2] || latitude, latitude) + padding
	bounding_box[3] = Math.max(bounding_box[3] || longitude, longitude) + padding
	return bounding_box
}

module.exports = {
	enrich,
}
