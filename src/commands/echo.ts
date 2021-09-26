import { CommandInteraction } from 'discord.js';
import { CommandDescriptor } from '../commandDescriptor';

const { SlashCommandBuilder } = require('@discordjs/builders');

export const descriptor: CommandDescriptor = {
    builder: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    callback: async (interaction: CommandInteraction) => {
        await interaction.channel?.send(interaction.options.getString('input') || '');
        await interaction.reply({ content: '✓', ephemeral: true });
    }
};
