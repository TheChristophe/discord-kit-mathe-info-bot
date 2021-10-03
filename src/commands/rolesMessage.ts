import { CommandDescriptorBase } from '../commandDescriptorBase';
import { SlashCommandBuilder } from '@discordjs/builders';
import {
    ApplicationCommandPermissionData,
    CommandInteraction,
    GuildChannel,
    GuildMember,
    MessageActionRow,
    MessageSelectMenu,
    MessageSelectOptionData,
    TextChannel,
} from 'discord.js';
import { matchPermissions, PrebuiltPermissions } from '../permissions';
import responses from '../genericResponses';
import { jahrgangRoles, oPhasenRoles, sonstigeRoles, studiengangRoles } from './roles';

const permissions: ApplicationCommandPermissionData[] = [
    PrebuiltPermissions.modsOnly,
    PrebuiltPermissions.botOwner,
];

export const OPHASE_ROLE_SELECT_ID = '26b349a1-441c-4329-b568-f77769dbd27b';
export const STARTSEMESTER_ROLE_SELECT_ID = '48af08f7-7c5d-430b-aac5-b6e870d20839';
export const FACH_ROLE_SELECT_ID = '920d86e0-ebb9-47d7-b426-6687b9628a5b';
export const MISC_ROLE_SELECT_ID = 'ed54dd52-1241-41fe-a38a-ae2f95f48ac8';

const DEFAULT_PLACEHOLDER = 'Pick a role';

export function makeRolePicker(
    commandName: string,
    pickerId: string,
    helpText: string,
    roles: MessageSelectOptionData[],
    options: {
        multiple?: boolean; // default true
        placeholder?: string;
    }
): CommandDescriptorBase {
    return {
        builder: new SlashCommandBuilder()
            .setName(commandName)
            .setDescription('Print a role message to the given channel')
            .addChannelOption((option) =>
                option
                    .setName('destination')
                    .setDescription('The channel to send it to')
                    .setRequired(true)
            ),
        callback: async (interaction: CommandInteraction) => {
            if (interaction.member === null) {
                await interaction.reply({ content: 'Wait, who are you?', ephemeral: true });
                return;
            }
            // todo: how to deal with APIInteractionGuildMember?
            if (!matchPermissions(interaction.member as GuildMember, permissions)) {
                await interaction.reply({
                    content: 'You are not allowed to use this',
                    ephemeral: true,
                });
                return;
            }
            const guildChannel = interaction.options.getChannel(
                'destination'
            ) as GuildChannel | null;
            if (!guildChannel) {
                await interaction.reply({
                    content: "Something's wrong, I can't fetch that channel",
                    ephemeral: true,
                });
                return;
            }
            if (!guildChannel.isText()) {
                await interaction.reply({
                    content: responses.NOT_TEXT,
                    ephemeral: true,
                });
                return;
            }
            const channel = guildChannel as TextChannel;

            const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(OPHASE_ROLE_SELECT_ID)
                    .setPlaceholder(options.placeholder ?? DEFAULT_PLACEHOLDER)
                    .setMaxValues(options.multiple ?? true ? roles.length : 1)
                    .addOptions(roles)
            );

            await channel.send({
                content: helpText,
                components: [row],
            });
            await interaction.reply({ content: responses.SUCCESS, ephemeral: true });
        },
        permissions: permissions,
    };
}

export const oPhasenPicker = makeRolePicker(
    'ophasen-picker',
    OPHASE_ROLE_SELECT_ID,
    'Bitte wähle deine O-Phasengruppen aus: ',
    oPhasenRoles,
    { placeholder: 'O-Phasengruppe' }
);

export const startPicker = makeRolePicker(
    'jahrgang-picker',
    STARTSEMESTER_ROLE_SELECT_ID,
    'Bitte wähle dein Jahrgang aus: ',
    jahrgangRoles,
    { placeholder: 'Jahrgang' }
);

export const subjectPicker = makeRolePicker(
    'fach-picker',
    FACH_ROLE_SELECT_ID,
    'Bitte wähle dein Fach aus:',
    studiengangRoles,
    { placeholder: 'Studiengang' }
);

export const miscPicker = makeRolePicker(
    'misc-picker',
    MISC_ROLE_SELECT_ID,
    'Weitere Rollen:',
    sonstigeRoles,
    {
        placeholder: 'Wähle etwas aus',
    }
);
