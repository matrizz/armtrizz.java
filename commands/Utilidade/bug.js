const Discord = require("discord.js")
const { env } = require("../..")

module.exports = {
    name: 'bug',
    description: 'Reporte um bug.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "bug",
            description: "Titulo do bug.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "descrição",
            description: "Descrição do bug.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "link_da_mensagem",
            description: "Copie o link da mensagem que deseja reportar.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "imagem",
            description: "Anexe uma imagem.",
            type: Discord.ApplicationCommandOptionType.Attachment,
            required: false,
        }
    ],
    run: async (client, interaction) => {

        let bug = interaction.options.getString("bug")
        let desc = interaction.options.getString("descrição")
        let msg_link = interaction.options.getString("link_da_mensagem")
        let imagem = interaction.options.getAttachment("imagem")

        const canal = client.channels.cache.get(env.BUG_CHANNEL)

        const embed = new Discord.EmbedBuilder()
            .setColor('Yellow')
            .setTitle('🚨 Novo bug reportado!')
            .addFields(
                { name: 'Reportado por', value: `${interaction.user} ||(\`${interaction.user.id}\`}`, inline: false },
                { name: 'Bug', value: `${bug}`, inline: true },
                { name: 'Descrição', value: `${desc}`, inline: false },
                { name: 'Link da mensagem', value: `${msg_link}`, inline: false },
                { name: 'Canal', value: `<#${interaction.channel.id}>`, inline: true }
            )
            .setTimestamp();

        let files;
        if (imagem) {
            const file = new Discord.AttachmentBuilder(imagem.url, { name: imagem.name });
            files = [file];
            embed.setImage(`attachment://${imagem.name}`);
        }
        canal.send({ embeds: [embed], flags: Discord.MessageFlags.Ephemeral, content: `||<@&${env.STAFF_ROLE}>||`, files }).then(() => {
            interaction.reply(`✅ Seu bug foi reportado e enviado em ${canal} com sucesso.`)
            setTimeout(() => {
                interaction.deleteReply().catch(console.error);
            }, 2500);
        }).catch((e) => {
            interaction.reply(`Algo deu errado.`)
        })

    }
}