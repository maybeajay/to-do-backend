import express from 'express'
import { register, getAllUsers, getmyProfile, login, LogOut } from '../controllers/user.js'
import { isAunthicated } from '../middlewares/auth.js'
const router = express.Router()
router.get('/all', getAllUsers)
router.post('/new', register)
router.post('/login', login)
router.get('/me',isAunthicated, getmyProfile)
router.get('/logout',LogOut)
export default router;