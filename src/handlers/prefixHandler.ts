import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import loadCommands from '../core/loadCommands.js';
import { client } from '../core/client.js';
import "dotenv/config";
import { loadCommandTypes } from '../core/loadCommandTypes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface prefixCommands {
  command: string,
  path: string,
}



async function handlePrefix(prefixCommands: prefixCommands[]): Promise<void> {
  for (const command of prefixCommands) {
    try {
      await fs.access(command.path);
      const module = await import(command.path);
      client.prefix.set(
        module.default.name,
        module.default
      );
    } catch {
      continue
    }
  }
}


export async function prefixHandler(): Promise<void> {
  const resolvePath = path.resolve(__dirname, '../', 'commands');
  const load = await loadCommands(resolvePath);
  const prefix = await loadCommandTypes(load, 'prefix');
  await handlePrefix(prefix);
}