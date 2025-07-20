const Discord = require("discord.js")
const transcript = require('discord-html-transcripts')

module.exports = {
    name: 'transcript',
    description: 'Transcreva todas as mensagens deste canal para um arquivo html.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const canalTranscript = interaction.channel

        const attachment = await transcript.createTranscript(canalTranscript,
            {
                limit: -1,
                returnType: 'attachment',
                filename: `${canalTranscript.name}.html`,
                saveImages: true,
                footerText: 'Foram exportadas {number} mensagen{s}!',
                poweredBy: true
            })

        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription(`Transcript do canal \`${canalTranscript.name}\` criado:`)

        interaction.reply({ embeds: [embed], files: [attachment] })

    }
}