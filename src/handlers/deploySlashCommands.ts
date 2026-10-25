import { REST, Routes } from 'discord.js'
import GetCommands from '../handlers/discoverCommands.js'

const discoveredCommands = GetCommands();
const slashCommandPayloads: string[] = [];

for (const command of Object.values(discoveredCommands)) {
  if (!command.slashFilePath) continue;
  const slashCommandFilePath = command.slashFilePath;
  const slashCommandModule = await import(slashCommandFilePath);
  const slashCommandData = slashCommandModule.default?.data?.toJSON();
 
  if (!slashCommandData) {
    console.error(new Error(`Command: \x1b[31m${command.commandName}\x1b[0m is missing a 'data' property`));
    continue;
  }
  slashCommandPayloads.push(slashCommandData);
}

const rest = new REST({ version: '10' }).setToken(
    process.env.BOT_TOKEN as string
  );

// If there is a guild ID in the .env file
if (process.env.BOT_PRIVATE_GUILD !== '0') {
  await rest.put(
    Routes.applicationGuildCommands(
      process.env.BOT_CLIENT_ID as string,
      process.env.BOT_PRIVATE_GUILD as string
    ),
    { body: slashCommandPayloads }
  )
    } else {
  // If there is no guild ID in the .env file
  await rest.put(
  Routes.applicationCommands(
    process.env.BOT_CLIENT_ID as string
  ),
  { body: slashCommandPayloads }
);
    }