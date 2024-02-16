const os = require('node:os');

console.log('Informacion del sistema operativo:');
console.log('-----------------------');

console.log('Nombre del sistema operativo', os.platform());
console.log('Versión del sistema operativo', os.release());
console.log('Memoria total del sistema operativo', os.totalmem() / 1024 / 1024);
console.log('Memoria libre del sistema operativo', os.freemem() / 1024 / 1024);
console.log('CPUs', os.cpus());
console.log('Uptime', os.uptime() / 60 / 60 / 24);
