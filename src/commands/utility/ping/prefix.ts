import { client } from '../../../core/client.js';
import type { Message } from 'discord.js';

export default {
  name: 'ping',
  execute: async (message: Message) => {
    const reply = await message.reply('Pong🏓');
    setTimeout(async () => {
      await reply.edit(client.ws.ping + 'ms');
    }, 1500)
  }
}