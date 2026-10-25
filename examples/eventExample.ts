import { Events } from 'discord.js'
import type { Message } from 'discord.js'

export default {
  event: Events.MessageCreate, // Discord Event
  async execute(message: Message) {
    message.reply(message.content); // Code to execute on event
  }
}