import { ApplicationCommandPermissionData, CommandInteraction } from 'discord.js';

export type CommandCallback = (interaction: CommandInteraction) => Promise<void>;

// TODO: encapsulation for id?
export type CommandDescriptorBase = {
    // typing the builder is complicated, so we only specify what we really need
    builder: { name: string };
    //commandData: ApplicationCommandData;
    callback: CommandCallback;
    permissions?: ApplicationCommandPermissionData[];
};
