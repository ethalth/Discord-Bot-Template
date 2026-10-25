import type { ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder, MessageFlags } from 'discord.js'
import createPingDisplay from './components/pingDisplay.js'

const slashData = new SlashCommandBuilder();
slashData.setName('ping'); // command name
slashData.setDescription('View the bots ping'); // command description
slashData.addBooleanOption((option) => option // Command option type
  .setName('ephemeral') // option name
  .setDescription('Make the message viewable to you only!') // Option description
);

export default {
  data: slashData,
  async execute(interaction: ChatInputCommandInteraction) {
    const isEphemeral = interaction.options.getBoolean('ephemeral'); // Checks if the option was used and/or if option is equal to "true"
    const gatewayPing = (interaction.client.ws.ping).toString();
    const pingDisplay = createPingDisplay(`🏓 Pong: ${gatewayPing}ms`); // Creates a ping display (View 'src/commands/utility/ping/component')
    if (!isEphemeral) {
      await interaction.reply({ components: [pingDisplay], flags: [MessageFlags.IsComponentsV2]}) // send message without it being "invisible"
    } else {
      await interaction.reply({ components: [pingDisplay], flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2]}) // Send message with it being only shoen to the user who used it
    }
  }
}