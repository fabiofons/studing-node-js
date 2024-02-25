const http = require('node:http')
const fs = require('node:fs')

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  if(req.url  === '/') {
    res.statusCode = 200
    res.end('<h1>Hola desde el servidor de node: Página home</h1>')
  } else if (req.url === '/about') {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end('<h2>Hola desde el servidor de node: Página about</h2>')
  } else if (req.url === '/bike-image') { 
    res.setHeader("Content-Type", "image/jpg")
    fs.readFile('./AA1A3867.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Internal Server Error')
      } else {
        res.end(data)
      }
    })

  } else {
    res.statusCode = 404
    res.end('Página no encontrada :(')
  }
}

const server = http.createServer(processRequest)

const port = process.env.PORT ?? 3000

  server.listen(port, () =>
    console.log(
    `escuchando en el puerto http://localhost:${port}`
    )
  )

