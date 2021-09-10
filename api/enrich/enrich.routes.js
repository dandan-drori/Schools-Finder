import express from 'express'
const router = express.Router()
import enrichController from './enrich.controller.js'

router.post('/', enrichController.enrich)

export default router
