import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { login, logout } from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', verifyToken, logout)

export default router
