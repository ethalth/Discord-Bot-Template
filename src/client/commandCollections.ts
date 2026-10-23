import { Collection } from 'discord.js';
import client from './client.js';

const commandCollections = {
  prefix: client.prefix = new Collection(),
  slash: client.slash = new Collection(),
  interaction: client.interaction = new Collection(),
  event: client.event = new Collection()
}

export default commandCollections