const express = require('express')
const ditto = require('./pokemon/ditto.json')

const port = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//   let body = ''
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     next()
//   })
// }) // ==> this middleware can be replace using app.use(express.json())

app.use(express.json())

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
