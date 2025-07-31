const Discord = require("discord.js")
const { env } = require("../..")
const { adb } = require("../../lib/utils/adb")

module.exports = {
    name: 'anitrack',
    description: 'Faz track de um anime e notifica para um canal quando um novo episodio sair.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id",
            description: "Digite o id do anime.",
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "link",
            description: "Cole o link do anime.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run: async (client, interaction) => {

        await interaction.deferReply();

        const animes = adb.get('animes') || []
        const links = adb.get('links') || {}

        let id = interaction.options.getInteger("id")
        let chat = interaction.options.getChannel("chat").id
        let link = interaction.options.getString("link")

        const set = new Set(animes)
        if (set.has(id)) {
            interaction.editReply({ content: '⚠️ Anime já adicionado!', flags: Discord.MessageFlags.Ephemeral })
            setTimeout(() => {
                interaction.deleteReply().catch(console.error);
            }, 2500);
            return
        }

        if (link) {
            links[id] = link
            adb.set('links', links)
        }

        set.add(id)
        animes.length = 0

        animes.push(...set)
        adb.set('channel', chat)
        adb.set('animes', animes)

        interaction.editReply({ content: 'Anime adicionado com sucesso!', flags: Discord.MessageFlags.Ephemeral })
        setTimeout(() => {
            interaction.deleteReply().catch(console.error);
        }, 2500);
    }
}