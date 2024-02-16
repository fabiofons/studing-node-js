import { statSync } from 'node:fs';

const stats = statSync('./archivo.txt');

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
);
