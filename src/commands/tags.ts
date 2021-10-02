import { CommandDescriptorBase } from '../commandDescriptorBase';
import {
    ApplicationCommandPermissionData,
    CommandInteraction,
    Constants,
    GuildMember,
} from 'discord.js';

import { database } from '../database';
import Sequelize from 'sequelize';
import { SlashCommandBuilder } from '@discordjs/builders';
import { matchPermissions, PrebuiltPermissions } from '../permissions';

const Tags = database.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    content: Sequelize.TEXT,
    author: Sequelize.STRING,
});

// param names
const TAG_NAME = 'name';
const TAG_CONTENT = 'content';

export const tag: CommandDescriptorBase = {
    builder: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('View tag')
        .addStringOption((option) =>
            option.setName('name').setDescription('The tag to display').setRequired(true)
        ),
    callback: async (interaction: CommandInteraction) => {
        const name = interaction.options.getString(TAG_NAME);

        const tag = await Tags.findOne({ where: { name } });
        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            await interaction.reply({ content: tag.get('content') as string });
        } else {
            await interaction.reply({
                content: "I don't know that tag <:sadness:591779689689907211>",
                ephemeral: true,
            });
        }
    },
};

enum TagsCommands {
    Set = 'set',
    Delete = 'delete',
}

const tagsPermissions: ApplicationCommandPermissionData[] = [
    PrebuiltPermissions.modsOnly,
    {
        // me
        id: '147399559247691776',
        type: Constants.ApplicationCommandPermissionTypes.USER,
        permission: true,
    },
];

export const tags: CommandDescriptorBase = {
    builder: new SlashCommandBuilder()
        .setName('tags')
        .setDescription('Tag actions')
        .addSubcommand((subCommand) =>
            subCommand
                .setName(TagsCommands.Set)
                .setDescription('Add or update a tag')
                .addStringOption((option) =>
                    option.setName(TAG_NAME).setDescription('The tag name').setRequired(true)
                )
                .addStringOption((option) =>
                    option.setName(TAG_CONTENT).setDescription('The tag contents').setRequired(true)
                )
        )
        .addSubcommand((subCommand) =>
            subCommand
                .setName(TagsCommands.Delete)
                .setDescription('Remove a tag')
                .addStringOption((option) =>
                    option.setName(TAG_NAME).setDescription('The tag name').setRequired(true)
                )
        ),
    callback: async (interaction: CommandInteraction) => {
        if (interaction.member === null) {
            await interaction.reply({ content: 'Wait, who are you?', ephemeral: true });
            return;
        }
        // todo: how to deal with APIInteractionGuildMember?
        if (!matchPermissions(interaction.member as GuildMember, tagsPermissions)) {
            await interaction.reply({
                content: 'You are not allowed to use this',
                ephemeral: true,
            });
            return;
        }
        if (interaction.options.getSubcommand() === TagsCommands.Set) {
            const name = interaction.options.getString(TAG_NAME);
            const content = interaction.options.getString(TAG_CONTENT);

            const tag = await Tags.findOne({ where: { name } });
            if (tag) {
                await tag.update(
                    {
                        content,
                    },
                    {
                        where: { name },
                    }
                );
            } else {
                try {
                    await Tags.create({
                        name: interaction.options.getString(TAG_NAME),
                        content: interaction.options.getString(TAG_CONTENT),
                        author: interaction.user.id,
                    });
                } catch (error: unknown) {
                    await interaction.reply({
                        content: 'Something went wrong with adding a tag.',
                        ephemeral: true,
                    });
                }
            }
            await interaction.reply({ content: 'Okay!', ephemeral: true });
        } else if (interaction.options.getSubcommand() === TagsCommands.Delete) {
            const name = interaction.options.getString(TAG_NAME);

            const rowCount = await Tags.destroy({ where: { name } });
            if (!rowCount) {
                await interaction.reply({ content: 'That tag did not exist.', ephemeral: true });
            }
            await interaction.reply({ content: 'Okay!', ephemeral: true });
        }
    },
    permissions: tagsPermissions,
};
