import express from "express";
import * as userController from '../controllers/userController.js'


const router = express.Router()

router.get('/',userController.getHome)
router.get('/all', userController.getUsers)
router.post('/login', userController.loginUser)
router.post('/register', userController.createUser)

export default router 