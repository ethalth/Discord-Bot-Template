import type { Message } from 'discord.js'
import { MessageFlags } from 'discord.js'
import createHelpDisplay from './components/helpDisplay.js'

export default {
  name: 'help',
  async execute(message: Message) {
    const helpDisplay = await createHelpDisplay(false);

    return message.reply( { components: [helpDisplay], flags: [MessageFlags.IsComponentsV2] } );
  }
}