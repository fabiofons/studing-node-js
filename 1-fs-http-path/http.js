const http = require('node:http');
const { findAvailablePort } = require('./free-port.js');

const server = http.createServer((req, res) => {
  console.log('recibiendo petición', server.timeout);
  res.end('Hello World');
});

const desiredPort = process.env.PORT ?? 3000;

// server.listen(0, () =>
//   console.log(
//     `escuchando en el puerto http://localhost:${server.address().port}`
//   )
// );

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () =>
    console.log(
    `escuchando en el puerto http://localhost:${port}`
    )
  );
});
