import type {ButtonInteraction} from 'discord.js'
import { MessageFlags } from 'discord.js'
import createPingDisplay from './components/pingDisplay.js'

export default {
  customId: 'ping_button_refresh',
  async execute (interaction: ButtonInteraction) {
    const gatewayPing = (interaction.client.ws.ping).toString();
    const pingDisplay = createPingDisplay(`🏓 Pong: ${gatewayPing}ms`);
    return interaction.update({ components: [pingDisplay], flags: MessageFlags.IsComponentsV2})
  }
}