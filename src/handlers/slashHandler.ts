import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import loadCommands from '../core/loadCommands.js';
import { client } from '../core/client.js';
import "dotenv/config";
import { loadCommandTypes } from '../core/loadCommandTypes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface slashCommands {
  command: string,
  path: string,
}



async function handleSlash(slashCommands: slashCommands[]): Promise<void> {
  for (const command of slashCommands) {
    try {
      await fs.access(command.path);
      const module = await import(command.path);
      client.slash.set(
        command.command,
        module.default
      );
    } catch {
      continue
    }
  }
}


export async function slashHandler(): Promise<void> {
  const resolvePath = path.resolve(__dirname, '../', 'commands');
  const load = await loadCommands(resolvePath);
  const slash = await loadCommandTypes(load, 'slash');
  await handleSlash(slash);
}