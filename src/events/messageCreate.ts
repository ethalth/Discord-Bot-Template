import { client } from '../core/client.js';
import { Events } from 'discord.js';
import { db } from '../index.js';
import "dotenv/config";

const log = console.log;

client.on(Events.MessageCreate, async(message) => {
  interface PrefixRow {
    prefix: string
  };
  
  let prefix: string;
  if (message.author.bot) return;
  if (!message.guild) return message.reply("You cannot use me in dms bitch.");
  try {
    const DBprefix = db.prepare('SELECT prefix FROM guilds WHERE i; = ?').get(message.guild.id) as PrefixRow;
    prefix = DBprefix.prefix;
  } catch {
    try {
      prefix = process.env.BOT_PREFIX as string;
    } catch {
      log('Error trying to read prefix!');
      process.exit(1);
    }
  }
  // Serious Prefix Shit
  // >ping hello = <prefix> <command> <args>
  if (!message.content.startsWith(prefix)) return;
  const commandName = message.content.slice(prefix.length).split(' ')[0] as string; // Without prefix
  const commandSource = client.prefix.get(commandName);
  if (!commandSource) return;
  await commandSource.execute(message);
});