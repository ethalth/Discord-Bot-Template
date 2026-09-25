import { client } from '../core/client.js';
import { Events } from 'discord.js';
import "dotenv/config";

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  try {
    var commandName = interaction.commandName;
  } catch {
    return
  }
  const commandSource = client.slash.get(commandName);
  if (!commandSource) return;
  await commandSource.execute(interaction);
})