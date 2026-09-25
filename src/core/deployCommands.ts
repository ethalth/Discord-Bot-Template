import { REST, Routes } from 'discord.js';
import { loadCommandTypes } from './loadCommandTypes.js';
import loadCommands from './loadCommands.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import 'dotenv/config';
import type { APIApplicationCommand } from 'discord-api-types/v10';

export default async function deploySlashCommands() {
  const commands: object[] = [];
  const log = console.log;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const resolvePath = path.resolve(__dirname, '../', 'commands');
  const load = await loadCommands(resolvePath);
  const slashCommands = await loadCommandTypes(load, 'slash');

  for (const command of slashCommands) {
    try {
      const importedCommand = await import(command.path);
      const slashCommand = importedCommand.default;

      if (!slashCommand?.data?.toJSON) continue;

      commands.push(slashCommand.data.toJSON());
    } catch {
      continue;
    }
  }

  const BOT_TOKEN = process.env.BOT_TOKEN as string;
  const BOT_CLIENT_ID = process.env.BOT_CLIENT_ID as string;

  const rest = new REST().setToken(BOT_TOKEN);

  const data = await rest.put(
    Routes.applicationCommands(BOT_CLIENT_ID),
    { body: commands }
  ) as APIApplicationCommand[];

  log(`Successfully reloaded ${data.length} application (/) commands.`);
}