import { Router } from 'express'
import { MovieController } from '../controllers/movie.controller.js'

export const movieRouter = Router()

movieRouter.get('/', MovieController.getAll)
movieRouter.get('/:id', MovieController.getById)
movieRouter.post('/', MovieController.createMovie)
movieRouter.patch(':/id', MovieController.updateMovie)
movieRouter.delete('/:id', MovieController.deleteMovie)
