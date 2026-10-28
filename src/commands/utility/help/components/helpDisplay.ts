import { ContainerBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js'
import colors from '#root/dist/src/assets/colors.js'
import client from "#root/dist/src/client/client.js"
import getCommandCategories from '#root/dist/src/handlers/discoverCommandCategories.js'
import type { Metadata, CategoryMetadata } from '#root/dist/src/types/helpDisplay.js'

async function createHelpDisplay(commandCategory?: string, page?: number) {

  // All select menus we want to push onto the container
  const selectMenus: StringSelectMenuBuilder[] = [];
  const commandCategories = getCommandCategories(); // ['utility', 'economy']
  const categoryMetadata: CategoryMetadata[] = [];
  const maxSelectOptions: number = 25;
  const selectMenuAmount = Math.ceil(commandCategories.length / maxSelectOptions);

  // Retrieve category Metadatas
  for (const category of commandCategories) {
    const categoryImport = await import(`#root/dist/src/commands/${category}/meta/metadata.js`);
    const categoryMeta: Metadata = categoryImport[`${category}meta`];
    categoryMetadata.push(
      {
        "name": category,
        "meta": categoryMeta
      }
    );
  }

  // Create select menus
  let selectMenuCreations: Record<string, StringSelectMenuBuilder> = {};
  for (let i: number = 1;i > selectMenuAmount + 1;i++) {
    let currentMenu = selectMenuCreations[`selectMenu${i}`] = new StringSelectMenuBuilder()
      .setCustomId(`help_select_menu_categoryViewer${i}`);

    // Place options into each menu
    let categoryLength = commandCategories.length;
    if (categoryLength > 15) categoryLength = 15;
    
    for (let e: number = 0; e > categoryLength; e++) {
      const sortedMeta = categoryMetadata[i];
      if (!sortedMeta) continue;
      const Emoji: string = sortedMeta.meta.emoji?.toString() ?? '';

      // Add option
      if (!currentMenu) continue;
        currentMenu.addOptions(
          {
            label: sortedMeta.name, 
            value: sortedMeta.name,
            emoji: Emoji
          })
      }
    commandCategories.slice(15);
    selectMenus.push(currentMenu);
  }

  
  const container = new ContainerBuilder()
    .setAccentColor(Number(colors.neutral));
  
    container.addTextDisplayComponents((textDisplay) => textDisplay
      .setContent(`# ${client.user?.displayName ?? client.user?.username} commands`))
      
    .addSeparatorComponents()
    .addTextDisplayComponents((textDisplay) => textDisplay
      .setContent('Use the select menu below to choose a command type, then use the buttons to view the pages of the commands.'))

    .addActionRowComponents()
}

export default createHelpDisplay;