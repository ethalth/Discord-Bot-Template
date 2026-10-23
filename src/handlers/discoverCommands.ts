import fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { 
  CommandDirectoryInfo, 
  CommandFileType,
  DiscoveredCommands,
  FilePathsByType,
  CommandFilePathKey
} from '../types/handlers.js'

const mapDirectoryFiles = async (arrayFilePath: string) => {
  const directoryEntries = await fs.readdir(arrayFilePath, {withFileTypes:true});
  const filePathsByType: FilePathsByType = {};
  for (const entry of directoryEntries) {
    const fileType: CommandFileType = (entry.name).split('.')[0] as CommandFileType;
    filePathsByType[fileType] = path.resolve(entry.parentPath, entry.name);
  }
  return filePathsByType;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandsFolderPath: string = path.resolve(__dirname, '../', 'commands');

const categoryDirectories: string[] = await fs.readdir(commandsFolderPath); // ["utility", "economy"] etcetera

// Loop through command type folders 
// To get command names so we can
// Loop through the command names 
// To get the actual command files to execute

const commandDirectories: CommandDirectoryInfo[] = [];

// puts folders into an array to loop through 
// to get the command files to sort into an obj later
for (const command of  categoryDirectories) {
  const categoryEntries = 
    await fs.readdir(path.resolve(__dirname, '../', 'commands', command)
    ,{ withFileTypes: true });

  // returns as an object 
  //{
  // "fileName": "ping",
  // "filePath": "<pathToPingFolder>",
  // "commandType": "utility, eco etc"
  //}
  for (const entry of categoryEntries.filter(e => e.isDirectory())) {
    commandDirectories.push({ 
      fileName: entry.name, 
      filePath: entry.parentPath + '/' + entry.name,
      commandType: entry.parentPath.split(path.sep).at(-1) as string
    });
  }
}

// Sort the files and commands into one object
// e.g.
//{ 
// "ping": {
//   "prefixFilePath": '<path>', 
//   "slashFilePath": '<path>',
//   "eventFilePath": '<path>',
//   "interactionFilePath": '<path>',
//   "commandParent": 'utility'
//  }
//}
const commandsByName: DiscoveredCommands = {};
const commandFileTypes: CommandFileType[] = 
  ['prefix', 'slash', 'event', 'interaction'];

// Loop through object to read folder and then
// sort into the new one

for (const command of commandDirectories) {
  commandsByName[command.fileName] = {
    commandParent: command.commandType,
    commandName: command.fileName
  };
  const commandFiles = await mapDirectoryFiles(command.filePath);

  for (const fileType of Object.keys(commandFiles) as CommandFileType[]) {
    if (!commandFileTypes.includes(fileType)) continue;
    commandsByName[command.fileName]![`${fileType}FilePath` as CommandFilePathKey] = commandFiles[fileType];
  }
}

function GetCommandFiles(): DiscoveredCommands {
  return commandsByName;
}

export default GetCommandFiles