const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const Coords = require('../../schemas/coords')
const mongoose = require('mongoose')
const mongoClient = require('mongodb').MongoClient

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coords')
        .setDescription('See all coords available!')
    ,
    async execute(interaction, client, message, args) {

        Coords.find({}, function (err, coords) {
            if (err) return console.log(err);
            else {
                if (coords.length === 0) {
                    message.channel.send("No coords information available.");
                    return;
                }

                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Available coordinates')
                    .setTimestamp(Date.now())
                    .setFooter({ text: 'made by limpan' });

                coords.forEach(coord => {
                    embed.addFields(
                        { name: coord.name, value: coord.coords },
                    );
                });

                interaction.reply({
                    embeds: [embed]
                })
            }
        });

    }
}