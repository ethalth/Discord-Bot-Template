import * as fs from 'node:fs/promises';

interface loadTypes {
  type: string,
  name: string,
  path: string
}

interface typeCommand {
  command: string,
  path: string,
}

export async function loadCommandTypes(commandNames: loadTypes[], commandType: string): Promise<typeCommand[]> {
  const commandFiles: typeCommand[] = [];
  for (const command of commandNames) {
    let commandJs = await fs.readdir(command.path, { withFileTypes: true });
    commandJs = commandJs.filter(e => e.isFile());
    // Loop through the files to grab thr commandType file
    for (const commandFile of commandJs) {
      if (commandFile.name === `${commandType}.js`) {
        commandFiles.push({
          "command": command.name,
          "path": command.path + '/' + `${commandType}.js`
        });
      } else {
        continue
      }
    }
  }
  return commandFiles;
}