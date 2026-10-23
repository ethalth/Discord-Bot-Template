import type {Message} from 'discord.js'
import { MessageFlags } from 'discord.js'
import createPingDisplay from './components/pingDisplay.js'


export default {
  name: 'ping',
  async execute(message: Message) {
    const gatewayPing = (message.client.ws.ping).toString();
    const pingDisplay = createPingDisplay(`🏓 Pong: ${gatewayPing}ms`);
    await message.reply({ components: [pingDisplay], flags: [MessageFlags.IsComponentsV2]})
  }
}