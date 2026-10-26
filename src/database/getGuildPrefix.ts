import type { Message } from 'discord.js'
import Db from './connection.js'

// Prefix
function getGuildPrefix(message: Message) {
  if (!message.guild) return;

  const result = Db
    .prepare(`SELECT prefix FROM guild WHERE id=?`)
    .get(message.guild.id) as { prefix: string } | undefined;
  
  const prefix = result ?? { prefix: process.env.BOT_PREFIX ?? '>' };

  // If message Author is a bot 
  if (message.author.bot) return;

  return prefix.prefix;
}

export default getGuildPrefix