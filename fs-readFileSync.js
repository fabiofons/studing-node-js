const fs = require('node:fs');

console.log('leyendo primer archivo');
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log('primer texto', text);

console.log('leyendo segundo archivo');

const secondText = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log('second text:', secondText);
