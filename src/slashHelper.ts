import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { token } from './config.json';

import { commands } from './commands';
import { SlashCommandBuilder } from '@discordjs/builders';

const commandsBuilders: SlashCommandBuilder[] = commands.map((command) => command.builder);

// Place your client and guild ids here
const clientId = '890905720164327454';
//const guildId = '501365485837877268';
const guildId = '348251688135557121';

const rest = new REST({ version: '9' }).setToken(token);

export async function setupSlashCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        commandsBuilders.map((c) => console.log('Added', c.name));

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandsBuilders }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}
