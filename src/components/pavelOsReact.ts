import { ComponentDescriptor } from '../componentDescriptor';
import { Client, Constants, Message } from 'discord.js';

export const descriptor: ComponentDescriptor = {
    setup: (client: Client) => {
        client.on(Constants.Events.MESSAGE_CREATE, async (message: Message) => {
            const contents = message.content.toLowerCase();
            if (contents.includes('pavel') && contents.includes('os')) {
                await message.react('🤬');
            }
        });
    },
    name: 'PavelOSReact'
};