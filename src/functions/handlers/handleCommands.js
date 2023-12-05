const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands")
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'))

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been passed though the handler`)
            }
        }

        const clientId = '1071077139945885816';
        const guildId = '1071076838559989780';
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
        try {
            console.log('Started refreshing the app`s (/) commands')

            await rest.put(Routes.applicationCommands(clientId),
                {
                    body: client.commandArray,
                }
            )
        }
        catch (err) {
            console.error(err);
        }
    }
}