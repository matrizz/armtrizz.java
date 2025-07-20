const Discord = require("discord.js")

module.exports = {
    name: 'report',
    description: 'Reportar mensagens de outros usuários.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'link_da_mensagem',
            description: 'Cole o link da mensagem que deseja reportar.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'motivo',
            description: 'Motivo do report.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        const snkzz = client.users.cache.get(process.env.MAIN_GUILD_OWNER)
        const mensagemLink = interaction.options.getString('link_da_mensagem');
        const motivo = interaction.options.getString('motivo');

        // Extrai id's do link da mensagem
        const regex = /https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;
        const match = mensagemLink.match(regex);

        if (!match) {
            return interaction.reply({ content: 'Link de mensagem inválido.', flags: Discord.MessageFlags.Ephemeral });
        }

        const [_, guildId, channelId, messageId] = match;

        try {
            const channel = await client.channels.fetch(channelId);
            if (!channel || channel.type !== Discord.ChannelType.GuildText) {
                return interaction.reply({ content: 'Canal não encontrado ou não é de texto.', flags: Discord.MessageFlags.Ephemeral });
            }

            const message = await channel.messages.fetch(messageId);

            const logChannel = await client.channels.fetch(process.env.REPORT_CHANNEL)
            if (!logChannel || logChannel.type !== Discord.ChannelType.GuildText) {
                return interaction.reply({ content: 'Canal de logs não encontrado.', flags: Discord.MessageFlags.Ephemeral });
            }

            const embed = new Discord.EmbedBuilder()
                .setColor('Red')
                .setTitle('🚨 Nova mensagem reportada')
                .addFields(
                    { name: 'Juiz', value: `${snkzz}`, inline: false },
                    { name: 'Autor da mensagem', value: `${message.author} ||(\`${message.author.id}\`)||`, inline: false },
                    { name: 'Mensagem', value: message.content || '[Mensagem sem texto]', inline: false },
                    { name: 'Canal', value: `<#${channelId}>`, inline: true },
                    { name: 'Link', value: `[Clique aqui para ver a mensagem](${mensagemLink})`, inline: false },
                    { name: 'Reportado por', value: `${interaction.user} ||(\`${interaction.user.id}\`)||`, inline: false },
                    { name: 'Motivo', value: motivo, inline: false }
                )
                .setTimestamp();

            const row = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`ban_temp_${message.author.id}`)
                    .setLabel('Ban Temporário')
                    .setStyle(Discord.ButtonStyle.Secondary),
                new Discord.ButtonBuilder()
                    .setCustomId(`ban_perm_${message.author.id}`)
                    .setLabel('Ban Permanente')
                    .setStyle(Discord.ButtonStyle.Danger)
            );

            await logChannel.send({ embeds: [embed], components: [row] });

            const replyMsg = await interaction.reply({ withResponse: true, content: 'Mensagem reportada com sucesso!' });
            setTimeout(() => {
                interaction.deleteReply().catch(console.error);
            }, 2500);
        } catch (err) {
            console.error(err)
        }
    }
}

