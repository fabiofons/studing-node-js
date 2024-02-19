import { readFile } from 'node:fs/promises';

Promise.all([
  await readFile('./archivo.txt', 'utf-8'),
  await readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('primer text:', text);
  console.log('segundo text', secondText);
});

console.log('haciendo algo mientras se resuelve el paralelo');
