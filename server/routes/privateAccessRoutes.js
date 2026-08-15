import { Router } from 'express'
import { postPrivateAccessLogin } from '../controllers/privateAccessController.js'

const router = Router()
router.post('/login', postPrivateAccessLogin)

export default router
