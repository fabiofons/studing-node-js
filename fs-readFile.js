const fs = require('node:fs');

console.log('leyendo primer archivo');
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('No se pudo leer archivo');
    process.env(1);
  }
  console.log(text);
});

console.log('hacer algo mientras lee archivos');

console.log('leyendo segundo archivo');
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('No se pudo leer archivo');
    process.env(1);
  }
  console.log(text);
});
