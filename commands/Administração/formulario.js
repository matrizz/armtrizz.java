const Discord = require("discord.js")
const db = require('../../lib/utils/db');

module.exports = {
    name: "formulário",
    description: "Abra o painel do formulário para os membros.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal_formulário",
            description: "Canal para enviar o formulário para os membros.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "canal_logs",
            description: "Canal para enviar as logs dos formulários recebidos.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, flags: Discord.MessageFlags.Ephemeral })
        } else {
            const canal_formulario = interaction.options.getChannel("canal_formulário")
            const canal_logs = interaction.options.getChannel("canal_logs")

            if (canal_formulario.type !== Discord.ChannelType.GuildText) {
                interaction.reply({ content: `O canal ${canal_formulario} não é um canal de texto.`, flags: Discord.MessageFlags.Ephemeral })
            } else if (canal_logs.type !== Discord.ChannelType.GuildText) {
                interaction.reply({ content: `O canal ${canal_logs} não é um canal de texto.`, flags: Discord.MessageFlags.Ephemeral })
            } else {
                await db.set(`form_channel_${interaction.guild.id}`, canal_formulario.id)
                await db.set(`log_channel_${interaction.guild.id}`, canal_logs.id)

                let embed = new Discord.EmbedBuilder()
                    .setDescription("Random")
                    .setTitle("Canais Configurados!")
                    .setDescription(`> Canal do Formulário: ${canal_formulario}.\n> Canal de Logs: ${canal_logs}.`)

                interaction.reply({ embeds: [embed], flags: Discord.MessageFlags.Ephemeral }).then(() => {
                    let embed_formulario = new Discord.EmbedBuilder()
                        .setColor("Random")
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setTitle(`Formulário:`)
                        .setDescription(`Faça seu formulário clicando no botão abaixo!`);

                    let botao = new Discord.ActionRowBuilder().addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId("formulario")
                            .setEmoji("☝")
                            .setLabel("Clique Aqui!")
                            .setStyle(Discord.ButtonStyle.Primary)
                    );

                    canal_formulario.send({ embeds: [embed_formulario], components: [botao] })
                })
            }
        }
    }
}