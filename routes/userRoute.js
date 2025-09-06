import express from "express";
import * as userController from '../controllers/userController.js'


const router = express.Router()

router.get('/',userController.getRegisterPage)
router.post('/register', userController.createUser)

export default router 