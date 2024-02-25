const express = require('express')
const movies = require('./movies.json')
const { read } = require('fs')

const port = process.env.PORT || 1234

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({"message": "Hola bienvenido a la nueva api rest"})
})

app.get('/movies', (req, res) => {
  const {genre} = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(
        g => g.toLowerCase() === genre.toLowerCase()
      )
    )
    return res.json({"movies": filteredMovies, "amount": filteredMovies.length})
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const {id} = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({error: 'Movie not found'})
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})

