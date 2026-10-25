import GetCommandFiles from './discoverCommands.js'
import commandCollections from '../client/commandCollections.js'

const commands = GetCommandFiles();
for (const command of Object.values(commands)) {
  // prefix
  if (command.prefixFilePath) {
    const prefixCommandModule = await import(command.prefixFilePath);
    if (!prefixCommandModule.default?.name) {
      console.error(new Error(`Command: ${command.commandName} is missing a 'name' property`));
      continue;
    }
      
    commandCollections.prefix.set(
      prefixCommandModule.default.name,
      prefixCommandModule.default
    );

    // Prefix Aliases 
    try {
      
    const aliases = prefixCommandModule.default.aliases ?? [];
    for (const alias of aliases) {
      commandCollections.prefix.set(
        alias,
        prefixCommandModule.default
      );
    }
    } catch (err){
      throw new Error(`Error: ${err}`);
    }
  }
  
  // slash
    if (command.slashFilePath) {
      const slashCommandModule = await import(command.slashFilePath);
      if (slashCommandModule.default) {

        let slashCommandData = slashCommandModule.default.data;
        if (!slashCommandData) {
          console.error(new Error(`'Data' was undefined in file: \x1b[33m${command.slashFilePath}\x1b[0m`));
          continue;
        }

        slashCommandData = slashCommandData.toJSON();

        if (!slashCommandData) {
          console.error(new Error(`Unable to convert data to json in file: \x1b[33m${command.slashFilePath}\x1b[0m`));
          continue;
        }
        
        if (!slashCommandData.name) {
          console.error(new Error('The method: \'.setName\' was undefined in \'data\''));
          continue;
        }
        commandCollections.slash.set(
          slashCommandData.name,
          slashCommandModule.default
        );
        
      }
    }
  
  // event
    if (command.eventFilePath) {
      const eventHandler = await import(command.eventFilePath);
      if (eventHandler.default?.event) {
        commandCollections.event.set(
          command.eventFilePath,
          eventHandler.default.event
        );
      } else {
        console.error(new Error(`'event' was undefined in: \x1b[31m${command.eventFilePath}\x1b[0m`));
        continue;
      }
    }
  
  // interaction
    if (command.interactionFilePath) {
      const interactionHandler = await import(command.interactionFilePath);
      if (interactionHandler.default?.customId) {
   
        commandCollections.interaction.set(
          interactionHandler.default.customId,
          interactionHandler.default
        );
        
      } else {
        console.error(new Error(`'customId' was undefined in: \x1b[31m${command.interactionFilePath}\x1b[0m`));
        continue;
      }
    }
}