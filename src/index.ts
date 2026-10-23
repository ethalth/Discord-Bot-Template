import 'dotenv/config';
import client from '#root/dist/src/client/client.js';
import { Events } from 'discord.js';
import './events/messageCreate.js'
import './handlers/loadCommands.js'
import './database/schema.js'
import './handlers/deploySlashCommands.js'
import './events/slashCommandCreate.js'
import './events/componentInteraction.js'
import commandCollections from './client/commandCollections.js'

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