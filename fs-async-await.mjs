import { readFile } from 'node:fs/promises';

console.log('leyendo primer archivo');
const text = await readFile('./archivo.txt', 'utf-8');
console.log('primer text:', text);

console.log('hacer algo mientras lee archivos');

console.log('leyendo segundo archivo');
const secondText = await readFile('./archivo2.txt', 'utf-8');
console.log('segundo text:', secondText);
