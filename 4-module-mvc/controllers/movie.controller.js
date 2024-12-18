import { MovieModel } from '../models/movie.model.js'
import { validateMovie, validateParcialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) return res.status(404).json({ error: 'Movie not found' })
    res.json(movie)
  }

  static async createMovie (req, res) {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.createMovie({ input: result.data })
    return res.status(201).json(newMovie)
  }

  static async updateMovie (req, res) {
    const { id } = req.params
    const newValues = validateParcialMovie(req.body)
    if (newValues.error) {
      return res.status(400).json({ error: JSON.parse(newValues.error.message) })
    }
    const movieUpdated = await MovieModel.updateMovie({ id, newData: newValues.data })
    if (!movieUpdated) return res.json({ error: 'Movie not found' })
    res.status(202).json(movieUpdated)
  }

  static async deleteMovie (req, res) {
    const { id } = req.params
    const movieDeleted = await MovieModel.deleteMovie({ movieId: id })
    if (!movieDeleted) return res.status(404).json({ error: 'Movie not found' })
    res.json({ message: 'Movie deleted' })
  }
}
