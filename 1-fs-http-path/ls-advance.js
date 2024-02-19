const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const folder = process.argv[2] ?? '.';

async function ls (directory) {
  let files;
  try {
    files = await fs.readdir(directory);
  } catch (error) {
    console.error(pc.red(`Error al leer el directorio: ${directory}`));
    process.exit(1);
  }
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(directory, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch {
      console.error(
        pc.red(`No se ha podido obtener informacion del archivo: ${filePath}`)
      );
      process.exit(1);
    }
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const size = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(
      size.toString().padStart(10)
    )} ${pc.yellow(fileModified)}`;
  });

  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);
