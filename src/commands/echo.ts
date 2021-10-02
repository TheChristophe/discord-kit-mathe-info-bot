import { CommandInteraction } from 'discord.js';
import { CommandDescriptorBase } from '../commandDescriptorBase';
import { SlashCommandBuilder } from '@discordjs/builders';

export const descriptor: CommandDescriptorBase = {
    builder: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption((option) =>
            option.setName('input').setDescription('The input to echo back').setRequired(true)
        ),
    /*commandData: {
        name: 'echo',
        description: 'Replies with your input!',
        options: [
            {
                name: 'input',
                description: 'The input to echo back',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true,
            },
        ],
    },*/
    callback: async (interaction: CommandInteraction) => {
        await interaction.channel?.send(interaction.options.getString('input') || '');
        await interaction.reply({ content: '✓', ephemeral: true });
    },
};
