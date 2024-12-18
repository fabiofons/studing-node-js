const express = require('express')
const cors = require('cors')
const movies = require('./movies.json')
const { validateMovie, validateParcialMovie } = require('./schemas/movies.js').default

const port = process.env.PORT || 1234

const ACCEPTED_URL = ['http://localhost:8080', 'http:localhost:1234']

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_URL.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      callback(new Error('Not allowed by CORS'))
    }
  })
)
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hola bienvenido a la nueva api rest' })
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json({ movies: filteredMovies, amount: filteredMovies.length })
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ error: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  console.log(result)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  return res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  const newValues = validateParcialMovie(req.body)

  if (newValues.error) {
    return res.status(400).json({ error: JSON.parse(newValues.error.message) })
  }

  const movieUpdated = { ...movies[movieIndex], ...newValues.data }

  movies[movieIndex] = movieUpdated

  return res.status(202).json(movieUpdated)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  console.log('id', id)
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  console.log('movies before', movies.length)
  movies.splice(movieIndex, 1)
  console.log('movies after', movies.length)
  res.json({ message: 'Movie deleted' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
