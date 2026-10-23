import { Collection } from 'discord.js';

declare module 'discord.js' {
  interface Client<Ready extends boolean = boolean> {
    prefix: Collection<string, any>;
    slash: Collection<string, any>;
    interaction: Collection<string, any>;
    event: Collection<string, any>;
  }
}