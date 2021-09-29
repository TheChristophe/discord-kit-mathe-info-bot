import { Client, Constants, Intents } from 'discord.js';
import { token } from './config.json';
import { setupSlashCommands } from './slashHelper';
import { commands } from './commands';
import { CommandCallback } from './commandDescriptor';
import { components } from './components';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });

const commandMap = new Map<string, CommandCallback>(commands.map((command) => [command.builder.name, command.callback]));

client.on(Constants.Events.INTERACTION_CREATE, async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    if (commandMap.has(interaction.commandName)) {
        await (commandMap.get(interaction.commandName) as CommandCallback)(interaction);
    } else {
        await interaction.reply({ content: 'Unknown command!', ephemeral: true });
    }
});

components.map((eventListener) => {
    console.log('Registering', eventListener.name);
    eventListener.setup(client);
});

client.once(Constants.Events.CLIENT_READY, async () => {
    console.log('Ready!');
    await setupSlashCommands();
});

client.login(token);
