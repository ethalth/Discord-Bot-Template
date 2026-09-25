import { SlashCommandBuilder, ContainerBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import { emojis } from '../../../../utils/config.js';
import { client } from '../../../core/client.js';

const slashData = new SlashCommandBuilder()
.setName('ping')
.setDescription('See the bots ping');

export default {
  data: slashData,
  execute: async (interaction: ChatInputCommandInteraction) => {
    const cv2 = new ContainerBuilder;
    cv2.addTextDisplayComponents((td) => td.setContent(`${emojis.ping} ${client.ws.ping}ms`));
    return interaction.reply({ components: [cv2], flags: [32768] });
  }
}