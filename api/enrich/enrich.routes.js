const express = require('express')
const router = express.Router()
const enrichController = require('./enrich.controller.js')

router.post('/', enrichController.enrich)

module.exports = router
