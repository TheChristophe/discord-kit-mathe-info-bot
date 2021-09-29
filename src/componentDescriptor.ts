import { Client } from 'discord.js';

export type SetupCallback = (client: Client) => void;

export type ComponentDescriptor = {
    setup: SetupCallback,
    name: string
}
