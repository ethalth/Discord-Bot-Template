import { Events } from 'discord.js'
import type { Message } from 'discord.js'

export default {
  event: Events.MessageCreate,
  async execute(message: Message) {
    message.reply(message.content);
  }
}