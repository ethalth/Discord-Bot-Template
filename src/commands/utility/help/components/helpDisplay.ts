import { ContainerBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js'
import colors from '#root/dist/src/assets/colors.js'
import client from "#root/dist/src/client/client.js"
import getCommandCategories from '#root/dist/src/handlers/discoverCommandCategories.js'

function createHelpDisplay(commandCategory?: string, page?: number) {

  // Select Menus
  const selectMenus: StringSelectMenuBuilder[] = [];
  
  const commandCategoryMenu = new StringSelectMenuBuilder()
  .setCustomId('help_selectMenu_commandType')
  .setPlaceholder('Choose a command Type!');

  const max_options = 25;
  const commandDirectories: string[] = getCommandCategories();

  if (commandDirectories.length > 25) {
    
  }

  for (const categoryOption of commandDirectories) {
    commandCategoryMenu.addOptions(
      { label: categoryOption, description: `All commands inside ${categoryOption}`, value: categoryOption }
    )
  }

  
  const container = new ContainerBuilder()
    .setAccentColor(Number(colors.neutral));
  
    container.addTextDisplayComponents((textDisplay) => textDisplay
      .setContent(`# ${client.user?.displayName ?? client.user?.username} commands`))
      
    .addSeparatorComponents()
    .addTextDisplayComponents((textDisplay) => textDisplay
      .setContent('Use the select menu below to choose a command type, then use the buttons to view the pages of the commands.'))

    .addActionRowComponents(
      new ActionRowBuilder()
      .addComponents();
    )
}