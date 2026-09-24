import { Events } from 'discord.js';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import loadCommands from './loadCommands.js';
import { client } from '../core/client.js';
import "dotenv/config";
import { db } from '../index.js';

const log = console.log;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface loadTypes {
  type: string,
  name: string,
  path: string,
}

interface prefixCommands {
  command: string,
  path: string,
}

async function loadPrefix(commandNames: loadTypes[]): Promise<prefixCommands[]> {
  const prefixFiles = [];
  for (const command of commandNames) {
    let prefixJs = await fs.readdir(command.path, { withFileTypes: true });
    prefixJs = prefixJs.filter(e => e.isFile());
    // Loop through the files to grab prefix.js
    for (const prefixFile of prefixJs) {
      if (prefixFile.name === 'prefix.js') {
        prefixFiles.push({
          "command": command.name,
          "path": command.path + '/' + 'prefix.js',
        });
      } else {
        continue
      }
    }
  }
  return prefixFiles;
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


export default async function prefixHandler(): Promise<void> {
  const resolvePath = path.resolve(__dirname, '../', 'commands');
  const load = await loadCommands(resolvePath);
  const prefix = await loadPrefix(load);
  const handle = await handlePrefix(prefix);
}