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
            name: "embeded",
            description: "Coloque um embed.",
            type: Discord.ApplicationCommandOptionType.Boolean,
            required: false,
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

        function parseFieldsFromCustom(desc) {
            return desc.split("|").map(pair => {
                const [name, value] = pair.split(":");
                return {
                    name: value?.trim() || "\u200B",
                    value: "\u200B",
                    inline: false
                };
            });
        }

        const embeded = interaction.options.getBoolean("embeded") || true

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, flags: Discord.MessageFlags.Ephemeral })
        } else {
            let titulo = interaction.options.getString("título")
            let desc = interaction.options.getString("descrição").replace(/\\n/g, '\n')
            let imagem = interaction.options.getAttachment("imagem")
            let cor = interaction.options.getString("cor")
            if (!cor) cor = "Random"
            let chat = interaction.options.getChannel("chat")
            if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`Este canal não é um canal de texto para enviar uma mensagem.`)

            let embed = new Discord.EmbedBuilder()
                .setTitle(titulo)
                .setColor(cor)
                .setDescription(desc);

            let files;
            if (imagem) {
                const file = new Discord.AttachmentBuilder(imagem.url, { name: imagem.name });
                files = [file];
                embed.setImage(`attachment://${imagem.name}`);
            }
            embeded ? chat.send({ embeds: [embed], content: `||@everyone||`, files }) :
                chat.send({ content: `||@everyone||\n\n${desc}`, files }).then(() => {
                    interaction.reply(`✅ Seu anúncio foi enviado em ${chat} com sucesso.`)
                }).catch((e) => {
                    interaction.reply(`Algo deu errado.`)
                })
        }

    }
}