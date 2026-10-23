import GetCommandFiles from './discoverCommands.js'
import commandCollection from '../client/commandCollections.js'

const commands = GetCommandFiles();
for (const command of Object.values(commands)) {
  // prefix
  if (command.prefixFilePath) {
    const prefixCommandModule = await import(command.prefixFilePath);
    if (!prefixCommandModule.default?.name) {
      console.error(new Error(`Command: ${command.commandName} is missing a 'name' property`));
      continue;
    }
      
    commandCollection.prefix.set(
      prefixCommandModule.default.name,
      prefixCommandModule.default
    );

    // Prefix Aliases 
    const aliases = prefixCommandModule.default.aliases ?? [];
    for (const alias of aliases) {
      
      commandCollection.prefix.set(
        alias,
        prefixCommandModule.default
      );
      
    }
    
  }
  
  // slash
    if (command.slashFilePath) {
      const slashCommandModule = await import(command.slashFilePath);
      if (slashCommandModule.default) {

        const slashCommandData = slashCommandModule.default.data.toJSON();
        if (!command) console.error(new Error('The method: \'.setName\' was undefined in \'data\''));
        commandCollection.slash.set(
          slashCommandData.name,
          slashCommandModule.default
        );
        
      } else {
        continue
      }
    }
  
  // event
    if (command.eventFilePath) {
      const eventHandler = await import(command.eventFilePath);
      if (eventHandler.default?.event) {
        commandCollection.event.set(
          eventHandler.default.event,
          eventHandler.default
        );
        
      }
    }
  
  // interaction
    if (command.interactionFilePath) {
      const interactionHandler = await import(command.interactionFilePath);
      if (interactionHandler.default?.customId) {
   
        commandCollection.interaction.set(
          interactionHandler.default.customId,
          interactionHandler.default
        );
        
      }
    }
}