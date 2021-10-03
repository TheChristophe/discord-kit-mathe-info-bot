import { ComponentDescriptor } from '../componentDescriptor';
import {
    Client,
    Constants,
    GuildMember,
    Interaction,
    MessageSelectMenu,
    SelectMenuInteraction,
    Snowflake,
} from 'discord.js';
import {
    FACH_ROLE_SELECT_ID,
    MISC_ROLE_SELECT_ID,
    OPHASE_ROLE_SELECT_ID,
    STARTSEMESTER_ROLE_SELECT_ID,
} from '../commands/rolesMessage';
import responses from '../genericResponses';

export const reactRoles: ComponentDescriptor = {
    setup: (client: Client) => {
        client.on(Constants.Events.INTERACTION_CREATE, async (interaction: Interaction) => {
            if (
                !interaction.isSelectMenu() ||
                ![
                    OPHASE_ROLE_SELECT_ID,
                    STARTSEMESTER_ROLE_SELECT_ID,
                    FACH_ROLE_SELECT_ID,
                    MISC_ROLE_SELECT_ID,
                ].includes(interaction.customId) ||
                interaction.guildId === null
            ) {
                return;
            }

            const selectInteraction = interaction as SelectMenuInteraction;
            const selectMenu = selectInteraction.component as MessageSelectMenu;
            const target = selectInteraction.member as GuildMember;
            const guild = client.guilds.cache.get(selectInteraction.guildId as string);
            if (guild === undefined) {
                return;
            }
            const allRoles = target.roles.cache.map((v, k) => k);
            const availableRoles: Snowflake[] = selectMenu.options.map((option) => option.value);
            const selectedRoles: Snowflake[] = selectInteraction.values;
            const unselectedRoles: Snowflake[] = availableRoles.filter(
                (s) => !selectedRoles.includes(s)
            );

            // remove selectedRoles too to avoid duplicates / api error
            await target.roles.set(
                allRoles
                    .filter((id) => !unselectedRoles.includes(id) && !selectedRoles.includes(id))
                    .concat(selectedRoles)
            );

            await interaction.reply({ content: responses.SUCCESS, ephemeral: true });
        });
    },
    name: 'ReactRoles',
};
