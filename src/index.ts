import "dotenv/config";
import { Events } from 'discord.js';
import process from 'node:process';
import Database from "better-sqlite3";
import prefixHandler from './handlers/prefixHandler.js';
import { client } from './core/client.js';

// Events
import './events/messageCreate.js';

export const db = new Database("./database/database.db");

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



client.once(Events.ClientReady, (readyClient) => {
  const $execTimeEnd: number = Date.now();
  const $execTimeTotal = Math.floor(($execTimeEnd - $execTimeStart) / 1000);
  log('Index Execution Time:',$execTimeTotal,'s');
  log(`Currently pinging at: ${client.ws.ping}ms`);
  log(`Logged in as ${readyClient.user.tag}`);
});

client.login(token);