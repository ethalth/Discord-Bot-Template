import { Events } from 'discord.js'
import client from '../client/client.js'
import commandCollections from '../client/commandCollections.js'
import type {Interaction} from 'discord.js'

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isButton() &&
      !interaction.isModalSubmit() &&
      !interaction.isAnySelectMenu()) return;

  const customId = interaction.customId;
  if (!customId) return;
  const interactionHandler = commandCollections.interaction.get(customId);
  if (!interactionHandler) return;
  await interactionHandler.execute(interaction);
})