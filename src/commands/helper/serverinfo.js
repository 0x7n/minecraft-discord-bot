const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Replies with info about the server!')
    ,
    async execute(interaction, client) {

        const api_url = 'https://api.minetools.eu/ping/145.239.177.119/25574'
        let getData = async () => {
            let response = await axios.get(api_url)
            let data = response.data
            return data
        }

        let data = await getData();
        const embed = new EmbedBuilder()
            .setColor("#22bf4c")
            .setTitle('Server information')
            .setTimestamp(Date.now())
            .addFields(
                {
                    name: "IP address", value: "145.239.177.119:25574"
                },
                {
                    name: "Description", value: `${data.description}`
                },
                {
                    name: "Latency", value: `${data.latency}`
                },
                {
                    name: "Online", value: `${data.players.online}`
                },
                {
                    name: "Version", value: `${data.version.name}`
                },
            )
            .setFooter({ text: 'made by limpan' });

        interaction.reply({
            embeds: [embed]
        })
    }
}