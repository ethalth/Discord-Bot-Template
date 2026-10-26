import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandsFolderPath: string = path.resolve(__dirname, '../', 'commands');

const categoryDirectories: string[] = await fs.readdir(commandsFolderPath) ?? [];

function getCommandCategories(categories: string[] = categoryDirectories) {
  return categories;
}

export default getCommandCategories;