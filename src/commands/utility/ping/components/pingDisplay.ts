import { ContainerBuilder, ButtonStyle } from 'discord.js'
import colors from '#root/dist/src/assets/colors.js'
import emojis from '#root/dist/src/assets/emojis.js'

function createPingDisplay(ping: string): ContainerBuilder {
  const container = new ContainerBuilder()
  .setAccentColor(Number(colors.neutral))
  .addSectionComponents((section) => section
    .addTextDisplayComponents((textDisplay) => textDisplay
      .setContent(ping))
    
    .setButtonAccessory((button) => button
      .setCustomId('ping_button_refresh')
      .setLabel('Refresh')
      .setStyle(ButtonStyle.Primary)
    )
  );
  return container;
}

export default createPingDisplay