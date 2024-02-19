const path = require('node:path');

const separator = path.sep;
console.log(separator);

const newPath = path.join('a', 'b', 'c');
console.log(newPath);

const base = path.basename('content/images/image.png');
console.log(base);

const ext = path.extname('content/images/image.png');
console.log(ext);
