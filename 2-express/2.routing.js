const http = require('node:http')

const dittoJSON = require('./pokemon/ditto.json') // CommonJS modules

const processRequest = (req, res) => {
  const { url, method } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto': {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify(dittoJSON))
        }
        default: {
          res.setHeader('Content-Type', 'text/html')
          res.statusCode = 404
          return res.end('<h1>Error 404</h1>')
        }
      }
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            data.timestamp = Date.now()
            return res.end(JSON.stringify(data))
          })
          break }

        default: {
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          return res.end('404 Not found')
        }
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('server listening in http://localhost:3000')
})
