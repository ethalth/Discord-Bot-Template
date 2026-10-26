import type { ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder, MessageFlags } from 'discord.js'
import createPingDisplay from './components/pingDisplay.js'
import pingMeta from './meta/metadata.js'

const slashData = new SlashCommandBuilder();
slashData.setName('ping');
slashData.setDescription(pingMeta.description);
slashData.addBooleanOption((option) => option
  .setName('ephemeral')
  .setDescription('Make the message viewable to you only!')
);

export default {
  data: slashData,
  async execute(interaction: ChatInputCommandInteraction) {
    const isEphemeral = interaction.options.getBoolean('ephemeral');
    const gatewayPing = (interaction.client.ws.ping).toString();
    const pingDisplay = createPingDisplay(`🏓 Pong: ${gatewayPing}ms`);
    if (!isEphemeral) {
      await interaction.reply({ components: [pingDisplay], flags: [MessageFlags.IsComponentsV2]})
    } else {
      await interaction.reply({ components: [pingDisplay], flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2]})
    }
  }
}