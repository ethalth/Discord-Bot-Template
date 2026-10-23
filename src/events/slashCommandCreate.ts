import { Events } from 'discord.js'
import type { Interaction } from 'discord.js'
import client from '../client/client.js'
import commandCollection from '../client/commandCollections.js'

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const commandName = interaction.commandName;
  const slashCommand = commandCollection.slash.get(commandName);
  try {
    await slashCommand.execute(interaction);
  } catch (err) {
    console.error(new Error(`${err}`));
  }
})