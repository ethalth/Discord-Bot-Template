import type {Message} from 'discord.js'
import { MessageFlags } from 'discord.js'
import createPingDisplay from './components/pingDisplay.js'


export default {
  name: 'ping', // Command Name
  async execute(message: Message) {
    const gatewayPing = (message.client.ws.ping).toString();
    const pingDisplay = createPingDisplay(`🏓 Pong: ${gatewayPing}ms`); // Creates a ping display (View 'src/commands/utility/ping/component')
    await message.reply({ components: [pingDisplay], flags: [MessageFlags.IsComponentsV2]}) // Send the message
  }
}