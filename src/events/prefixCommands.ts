import { Events } from 'discord.js'
import client from '../client/client.js'
import commandCollections from '../client/commandCollections.js'
import type { Message } from 'discord.js'
import getGuildPrefix from '../database/getGuildPrefix.js'

client.on(Events.MessageCreate, async (message: Message) => {
const prefix = getGuildPrefix(message) as string;
  
  // If message starts with prefix
  if (message.content.startsWith(prefix)) {
    // Remove the prefix from the start
    const commandName = message.content
      .slice(prefix.length)
      .split(' ')[0] as string;

    const prefixCommand = commandCollections.prefix.get(commandName);
    if (!prefixCommand) return;
    await prefixCommand.execute(message);
  }
})