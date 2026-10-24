import client from '#root/dist/src/client/client.js'
import commandCollections from '#root/dist/src/client/commandCollections.js'
import type { Message } from 'discord.js'

commandCollections.event.forEach((name, event) => {
  client.on(name, async (message: Message) => {
    const eventCommand = await import(event);
    if (!eventCommand) return;
    const eventCommandDefault = eventCommand.default;
    if (!eventCommandDefault) return;
    await eventCommandDefault.execute(message);
  })
})
