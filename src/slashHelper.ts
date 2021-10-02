import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { token, clientId, guildIds } from './config.json';

import { commands } from './commands';
import { ApplicationCommand } from 'discord.js';

const rest = new REST({ version: '9' }).setToken(token);

export async function setupSlashCommands() {
    try {
        console.log(
            'Registering commands',
            commands.map((command) => command.builder.name).join(', ')
        );

        type GuildCommands = { guildId: string; commands: ApplicationCommand[] };

        const guildCommands = (await Promise.all(
            guildIds.map(
                (guild) =>
                    new Promise<GuildCommands>((resolve, reject) => {
                        (
                            rest.put(Routes.applicationGuildCommands(clientId, guild), {
                                body: commands.map((command) => command.builder),
                            }) as Promise<ApplicationCommand[]>
                        ).then(
                            (value: ApplicationCommand[]) =>
                                resolve({
                                    guildId: guild,
                                    commands: value,
                                }),
                            () => reject()
                        );
                    })
            )
        )) as GuildCommands[];

        // TODO: is there nicer way to assign commands their ids?
        //       this is kind of awful, thanks discord
        guildCommands.map((guild) => {
            commands.map((command) => {
                guild.commands.map((guildCommand) => {
                    if (command.builder.name === guildCommand.name) {
                        command.idMappings.set(guild.guildId, guildCommand.id);
                    }
                });
            });
        });
    } catch (error) {
        console.error(error);
    }
}
