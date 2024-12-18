// Load json files in ESModule using a custom require or using fileSystem

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
