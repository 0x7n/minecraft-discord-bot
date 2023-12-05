const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const Coords = require('../../schemas/coords')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addcoordinate')
        .setDescription('Add a coordinate!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name to save').setRequired(true))
        .addStringOption(option =>
            option.setName('coords')
                .setDescription('The coords to save').setRequired(true))
    ,
    async execute(interaction, client, message, args) {
        const coordinates = interaction.options.getString('coords');
        const name = interaction.options.getString('name');

        try {
            await Coords.create({
                name: name,
                coords: coordinates
            })
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Added Coordinates Successfully`)
                .addFields(
                    {
                        name: name,
                        value: coordinates
                    }
                )
                .setTimestamp(Date.now())

            await interaction.reply({
                embeds: [embed]
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}