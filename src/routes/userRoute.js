import express from "express";
import * as userController from '../controllers/userController.js'


const router = express.Router()

router.get('/',userController.getHome)
router.get('/all', userController.getUsers)
router.post('/login', userController.loginUser)
router.post('/register', userController.createUser)
router.delete('/delete/:id', userController.deleteUser)
router.put('/update/:id', userController.updateUser)

export default router
