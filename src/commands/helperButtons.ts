import { SlashCommandBuilder } from '@discordjs/builders';
import {
    ApplicationCommandPermissionData,
    CommandInteraction,
    GuildChannel,
    GuildMember,
    MessageActionRow,
    MessageButton,
    TextChannel,
} from 'discord.js';
import { matchPermissions, PrebuiltPermissions } from '../permissions';
import responses from '../genericResponses';

const permissions: ApplicationCommandPermissionData[] = [
    PrebuiltPermissions.modsOnly,
    PrebuiltPermissions.botOwner,
];

const introText: string = `Herzliches Willkommen auf dem (inoffiziellen) KIT Mathe Info Server!

Ich bitte dich, die Informationen hier kurz durchzulesen, bevor du zu den anderen Kanälen gehst, damit alle in Einklang mit dem erwarteten Verhalten sind.

Wie der Name bereits vermuten lässt versammeln sich hier die Mathe- und Informatikstudenten des Karlsruher Institut für Technologie, um sich über das Studium, aber natürlich auch jede Menge anderes zu unterhalten`;

export const RULES_ID = 'a39b4efa-f455-475f-bdd0-d757e022aaa4';
export const STRUCTURE_ID = 'a5c08618-672b-4915-9ed5-054b1f52f058';
export const LINKS_ID = 'd82cd948-90fe-4c27-a34e-e0ee526582a9';
export const DATA_COLLECITON_ID = 'e63aa8e2-78c3-43a0-8290-c4f1f7c8152e';

export const helpButtons = {
    builder: new SlashCommandBuilder()
        .setName('helper-buttons')
        .setDescription('Send a message with helper buttons to the given channel')
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
        const guildChannel = interaction.options.getChannel('destination') as GuildChannel | null;
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

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId(RULES_ID).setLabel('Regeln').setStyle('SECONDARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId(STRUCTURE_ID)
                    .setLabel('Serverstruktur')
                    .setStyle('SECONDARY')
            )
            .addComponents(
                new MessageButton().setCustomId(LINKS_ID).setLabel('Links').setStyle('SECONDARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId(DATA_COLLECITON_ID)
                    .setLabel('Daten')
                    .setStyle('SECONDARY')
            );
        await channel.send({
            content: introText,
            components: [row],
        });
        await interaction.reply({ content: responses.SUCCESS, ephemeral: true });
    },
    permissions: permissions,
};
