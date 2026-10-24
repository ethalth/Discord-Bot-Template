import { Events } from 'discord.js'
import client from '../client/client.js'
import Db from '../database/connection.js'
import commandCollections from '../client/commandCollections.js'
import type { Message } from 'discord.js'

client.on(Events.MessageCreate, async (message: Message) => {
  // Prefix
  if (!message.guild) return;
  const {prefix} = Db
    .prepare(`SELECT * FROM guild WHERE id=?`)
    .get(message.guild.id) as { prefix: string } ?? { prefix: process.env.BOT_PREFIX };

  // If message Author is a bot 
  if (message.author.bot) return;
  
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