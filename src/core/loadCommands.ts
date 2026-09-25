import fs from 'node:fs/promises';

interface loadTypes {
  type: string,
  name: string,
  path: string
}

export default async function loadCommands(commandsPath: string): Promise<loadTypes[]> {
  const commands = [];
  let commandTypes = await fs.readdir(commandsPath, { withFileTypes: true }); // Read the commands directory
  commandTypes = commandTypes.filter(e => e.isDirectory()); // All folders under the commands directory
  
  // Loop through all the folders to get the commandTypes
  for (const type of commandTypes) {
    let commandNames = await fs.readdir(commandsPath + '/' + type.name, { withFileTypes: true }); // Read the directory of the commandType
    commandNames = commandNames.filter(e => e.isDirectory()); // All folders under the commandTye directory
    // Loop through folder to get commandName
    for (const command of commandNames) { 
      commands.push({
        "type": type.name,
        "name": command.name,
        "path": commandsPath + '/' + type.name + '/' + command.name,
      })
    }
  }
  return commands
}