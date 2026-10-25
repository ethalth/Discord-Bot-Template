import client from '#root/dist/src/client/client.js';
import commandCollections from './client/commandCollections.js'
import 'dotenv/config';
import fs from 'node:fs/promises';

// A check to see if .env exists
try {
  (await fs.access('./.env'))
} catch {
  throw new Error(`The file: \x1b[33m.env\x1b[0mdoes not exist`);
}

await import('./handlers/loadCommands.js');
await import ('./events/customEvents/registerCustomEvents.js');
await import ('./events/prefixCommands.js')
await import ('./database/schema.js')
await import ('./handlers/deploySlashCommands.js')
await import ('./events/slashCommandCreate.js')
await import ('./events/componentInteraction.js')

import { Events } from 'discord.js';
const TOKEN: string|undefined = process.env.BOT_TOKEN;
if (!TOKEN)
  throw new Error('\x1b[1;31mInvalid Bot Token.\x1b[0m');

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Successfully logged in as ${readyClient.user.tag}`);
  console.log(`------`);
  console.log(`Loaded Commands:`);
  console.log(`Prefix: ${commandCollections.prefix.size}`);
  console.log(`Slash: ${commandCollections.slash.size}`);
  console.log(`Interactions: ${commandCollections.interaction.size}`);
  console.log(`Events: ${commandCollections.event.size}`);
})

client.login(TOKEN);