export interface CommandDirectoryInfo {
  fileName: string,
  filePath: string,
  commandType: string
}

export type CommandFileType = 'prefix' | 'slash' | 'event' | 'interaction'

export interface DiscoveredCommands {
  [key: string]: { //Command Name
    prefixFilePath?: string | undefined,
    slashFilePath?: string | undefined,
    eventFilePath?: string | undefined,
    interactionFilePath?: string | undefined,
    commandParent?: string,
    commandName: string
  }
}

export interface FilePathsByType {
  prefix?: string,
  slash?: string,
  event?: string,
  interaction?: string
}

export type CommandFilePathKey = `${CommandFileType }FilePath`;
