import path from 'node:path'
import fs from 'node:fs/promises'


async function fetchCommands(commandCategory: string) {
  const categoryPath = path.resolve(`#root/dist/src/commands/${commandCategory}`);
  const readPath = await fs.readdir(categoryPath, { withFileTypes: true });

  for (const command of readPath.filter((e) => e.isDirectory())) {
    if (command.name === 'meta') continue;
  }

  // filter files 
  
  // ignore meta folder

  // if has slash

  // if has prefix
  
}

export default fetchCommands