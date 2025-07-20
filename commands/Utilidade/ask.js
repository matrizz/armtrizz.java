const Discord = require("discord.js");
const { askGemini } = require('../../AI/core');

module.exports = {
    name: "ask",
    description: "Pergunte algo para a IA. (Beta)",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "pergunta",
            description: "O que deseja perguntar?",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "embed",
            description: "Resposta em embed?",
            type: Discord.ApplicationCommandOptionType.Boolean,
            required: false
        }
    ],
    run: async (client, interaction) => {
        let pergunta = interaction.options.getString("pergunta")
        let isEmbed = interaction.options.getBoolean("embed") ?? false

        await interaction.deferReply()

        let resposta = await askGemini(pergunta)

        const bot = client.user.username
        const avatar_bot = client.user.displayAvatarURL()

        if (isEmbed) {
            const embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: `${bot} AI (Beta)` })
                .setFooter({ text: `${bot} AI (Beta)`, iconURL: avatar_bot })
                .setTimestamp(new Date())
                .setDescription(resposta || "Não foi possível gerar uma resposta no momento ou excedeu o limite diário.");

            interaction.editReply({ embeds: [embed] })
            return
        }

        const timestamp = Math.floor(Date.now() / 1000);
        interaction.editReply({ content: `${`\`${bot} AI (Beta)\`\n\n` + resposta || "Não foi possível gerar uma resposta no momento ou excedeu o limite diário."}` })

    }
}
