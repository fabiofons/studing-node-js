import { readJSON } from '../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async createMovie ({ input }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async updateMovie ({ id, newData }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    const movieUpdated = { ...movies[movieIndex], ...newData }
    movies[movieIndex] = movieUpdated

    return movieUpdated
  }

  static async deleteMovie ({ movieId }) {
    const movieIndex = movies.findIndex((movie) => movie.id === movieId)
    if (movieIndex === -1) {
      return false
    }
    movies.splice(movieIndex, 1)
    return true
  }
}
