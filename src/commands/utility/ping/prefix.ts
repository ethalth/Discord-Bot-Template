import { client } from '../../../core/client.js';
import type { Message } from 'discord.js';
import { ContainerBuilder } from 'discord.js';
import { emojis } from '../../../../utils/config.js';

export default {
  name: 'ping',
  execute: async (message: Message) => {
    const cv2 = new ContainerBuilder;
    cv2.addTextDisplayComponents((td) => td.setContent(`${emojis.ping} ${client.ws.ping}ms`));
    await message.reply({ components: [cv2], flags: [32768] });
  }
}