import "dotenv/config";
import { Events } from 'discord.js';
import process from 'node:process';
import Database from "better-sqlite3";
import { prefixHandler } from './handlers/prefixHandler.js';
import { slashHandler } from './handlers/slashHandler.js';
import { client } from './core/client.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import deploySlashCommands from './core/deployCommands.js';

// Events
import './events/prefixListener.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new Database(path.join(__dirname, "../../src/database/database.db"));

// How long it took to start bot
const $execTimeStart: number = Date.now();

// Create Tables
db.exec(`
CREATE TABLE IF NOT EXISTS guilds (
id STRING PRIMARY KEY
)`);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
id STRING PRIMARY KEY
)`);

const log = console.log;
  
const token = process.env.BOT_TOKEN;
try {
  if (!token) {
    throw new Error("Invalid bot token");
  }
} catch (err) {
  log(`\x1b[1;31m${err}\x1b[0m`);
  process.exit(1);
}

//-------------------
//---HANDLERS--------
//-------------------

// PREFIX
await prefixHandler();
// SLASH
await slashHandler();
// INTERACTIONS 

// EVENTS


//-------------------
//---DEPLOY----------
//-------------------
await deploySlashCommands();

client.once(Events.ClientReady, (readyClient) => {
  const $execTimeEnd: number = Date.now();
  const $execTimeTotal = Math.floor(($execTimeEnd - $execTimeStart) / 1000);
  log(`Logged in as ${readyClient.user.tag}`);
  log('========Loaded Commands========');
  log(`Prefix: ${client.prefix.size}`);
  log(`Slash: ${client.slash.size}`);
  log(`Interactions: ${client.interactions.size}`);
  log(`Events: ${client.events.size}`);
  log('==========Other Shit===========');
  log(`Executed in: ${$execTimeTotal}seconds`);
  log(`Logged in with a ping of ${client.ws.ping}ms`);
});

client.login(token);