const fs = require('node:fs');

fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error al leer el fichero;', err);
    return;
  }
  files.forEach((file) => console.log(file));
});

// -------> using Promises const fs = require("node:fs/promises");
// fs.readdir(".")
//   .then((files) => {
//     files.forEach((file) => console.log(file));
//   })
//   .catch((err) => {
//     console.error("Error al leer el fichero;", err);
//   });
