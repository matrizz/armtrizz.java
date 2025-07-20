const Discord = require("discord.js")

module.exports = {
    name: "anunciar",
    description: "Anuncie algo em uma embed.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "título",
            description: "Escreva algo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "descrição",
            description: "Escreva algo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "imagem",
            description: "Coloque uma imagem.",
            type: Discord.ApplicationCommandOptionType.Attachment,
            required: false,
        },
        {
            name: "cor",
            description: "Coloque uma cor em hexadecimal.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, flags: Discord.MessageFlags.Ephemeral })
        } else {
            let titulo = interaction.options.getString("título")
            let desc = interaction.options.getString("descrição")
            let imagem = interaction.options.getAttachment("imagem")
            let cor = interaction.options.getString("cor")
            if (!cor) cor = "Random"
            let chat = interaction.options.getChannel("chat")
            if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`)

            let embed = new Discord.EmbedBuilder()
                .setTitle(titulo)
                .setDescription(desc)
                .setColor(cor);

            let files;
            if (imagem) {
                const file = new Discord.AttachmentBuilder(imagem.url, { name: imagem.name });
                files = [file];
                embed.setImage(`attachment://${imagem.name}`);
            }
            chat.send({ embeds: [embed], content: `||@everyone||`, files }).then(() => {
                interaction.reply(`✅ Seu anúncio foi enviado em ${chat} com sucesso.`)
            }).catch((e) => {
                interaction.reply(`❌ Algo deu errado.`)
            })
        }

    }
}