import express from 'express'
import * as bookController from '../controllers/bookController'

const router = express.Router()

router.get('/all', bookController.getAllBooks)
router.post('/', bookController.createBook)
router.put('/:id', bookController.updateBook)
router.delete('/:id', bookController.deleteBook)
router.get('/', bookController.getBooksByUser)

export default router
