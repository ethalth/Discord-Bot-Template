import { ContainerBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js'
import colors from '#root/dist/src/assets/colors.js'
import client from "#root/dist/src/client/client.js"
import getCommandCategories from '#root/dist/src/handlers/discoverCommandCategories.js'
import createCommandDisplay from './commandDisplay.js'
import type { FileMetadata, CategoryMetadata } from '#root/dist/src/types/helpDisplay.js'

async function createHelpDisplay(showEmptyFolders: boolean, commandCategory?: string, page?: number): Promise<ContainerBuilder>{

  // All select menus we want to push onto the container
  const selectMenus: StringSelectMenuBuilder[] = [];
  const commandCategories = getCommandCategories(); // ['utility', 'economy']
  let maxSelectOptions: number = 25; // The max amount of options a select menu can hold
  
  if (commandCategories.length < maxSelectOptions) 
    maxSelectOptions = commandCategories.length;
  
  // Amount of needed select menus
  const selectMenuAmount = Math.ceil(commandCategories.length / maxSelectOptions);

  let newContainer: ContainerBuilder = new ContainerBuilder()
    .setAccentColor(Number(colors.neutral))
    .addTextDisplayComponents((TextDisplay) => TextDisplay
      .setContent(`# ${client.user?.displayName ?? client.user?.username}`))
    .addTextDisplayComponents((TextDisplay) => TextDisplay
      .setContent(`Using the select menu(s) below, please choose a category of commands you would like to view.`))
    .addSeparatorComponents((Separator) => Separator);

  // Select Menu Creator
  for (let i=1; i < (selectMenuAmount + 1); i++) {
    const currentMenu: StringSelectMenuBuilder = new StringSelectMenuBuilder()
      .setCustomId(`help_select_${i}`);

    // Loop through the first {maxSelectOptions} directories
    for (let e=1; e < (maxSelectOptions + 1); e++) {
      const currentCategory = commandCategories[(e - 1)];
      const categoryMeta = await import(`#root/dist/src/commands/${currentCategory}/meta/metadata.js`);
      const currentCategoryMeta: CategoryMetadata = categoryMeta.default;
      // Add option to select menu
      const option = new StringSelectMenuOptionBuilder()
        .setLabel(currentCategory as string)
        .setDescription(currentCategoryMeta.description as string)
        .setValue(currentCategory as string);

      // Check if meta has a valid emoji and add it
      if (currentCategoryMeta.emoji) 
        option.setEmoji({ id: currentCategoryMeta.emoji as string});

      // Add option to the menu
      currentMenu.addOptions(option);
    }
    // if there are more categories than {maxSelectOptions} length,
    // we slice {maxSelectOptions} length from the array of categories (commandCategories)
    // Update commandCategory length to be {maxSelectOptions} less

    
    // Add the select menu to the container
    newContainer.addActionRowComponents((ActionRow) => ActionRow
      .addComponents(currentMenu))


  }
  // function args handlers

  // if no options were present
  if (commandCategories.length === 0) {
    newContainer = new ContainerBuilder()
      .setAccentColor(Number(colors.danger))
      .addTextDisplayComponents((TextDisplay) => TextDisplay
        .setContent('No command categories were found!'))
  }

  // If {page} was the only arg not empty
  else if (!commandCategory && page) {
    newContainer = new ContainerBuilder()
      .setAccentColor(Number(colors.danger))
      .addTextDisplayComponents((TextDisplay) => TextDisplay
        .setContent('You must input a command Category before choosing a page.'));
  }

  // If user chose a commandCategory
  else if (commandCategory) {
    const chosenPage = page ?? 0;
    newContainer = await createCommandDisplay(commandCategory, chosenPage);
    
  }
  return newContainer
}


export default createHelpDisplay;

createHelpDisplay(false)