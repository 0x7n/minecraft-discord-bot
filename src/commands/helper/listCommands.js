const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('See all commands available!')
    ,
    async execute(interaction, client, channel) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Available commands')
            .addFields(
                { name: '/ping', value: 'Checks the bots ping' },
                { name: '/addcoordinate', value: 'Adds a coordinate to the list' },
                { name: '/coords', value: 'Shows all the saved coordinates' },
                { name: '/serverinfo', value: 'Shows info about the server, online players, latency, description and version' },
            )
            .setTimestamp(Date.now())
            .setFooter({ text: 'made by limpan' })

        await interaction.reply({
            embeds: [embed]
        })
    }
}