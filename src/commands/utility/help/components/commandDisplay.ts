import { ContainerBuilder } from 'discord.js'
import path from 'node:path'
import colors from '#root/dist/src/assets/colors.js'
import fetchCommands from '#root/dist/src/handlers/fetchCategoryCommands.js'

async function createCommandDisplay(commandCategory: string, page: number): ContainerBuilder {
  const commandMetaPath = path.resolve(`#root/dist/src/commands/${commandCategory}/meta/metadata.js`);
  const maxCommandsPerPage = 10;
  const getCommands = await fetchCommands(commandCategory);
  
  const newContainer = new ContainerBuilder()
    .setAccentColor(Number(colors.danger));

  return newContainer;
}

export default createCommandDisplay