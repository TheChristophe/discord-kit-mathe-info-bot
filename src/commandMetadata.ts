import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export type CommandCallback = (interaction: CommandInteraction) => Promise<void>;

export type CommandMetadata = {
    builder: SlashCommandBuilder,
    callback: CommandCallback
}
