import { Client, Intents } from 'discord.js';
import { token } from './config.json';
import { setupSlashCommands } from './slashHelper';
import { commands } from './commands';
import { CommandCallback } from './commandMetadata';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commandMap = new Map<string, CommandCallback>(commands.map((command) => [command.builder.name, command.callback]));

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    if (commandMap.has(interaction.commandName)) {
        await (commandMap.get(interaction.commandName) as CommandCallback)(interaction);
    }
});

client.once('ready', async () => {
    console.log('Ready!');
    await setupSlashCommands();
});

client.login(token);
