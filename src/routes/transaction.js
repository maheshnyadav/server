import express from 'express'
import { transfer } from '../controllers/transaction.js'

const router = express.Router()

router.post('/transfer', transfer)

export default router
