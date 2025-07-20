require('../index')

const Discord = require('discord.js')
const client = require('../index')
const db = require("../lib/utils/db")

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "formulario") {
      if (!interaction.guild.channels.cache.get(await db.get(`log_channel_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, flags: Discord.MessageFlags.Ephemeral })
      const modal = new Discord.ModalBuilder()
        .setCustomId("modal")
        .setTitle("Formulário");

      const pergunta1 = new Discord.TextInputBuilder()
        .setCustomId("question1")
        .setLabel("Pergunta 1??")
        .setMaxLength(30)
        .setMinLength(5)
        .setPlaceholder("Resposta 1:")
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short)

      const pergunta2 = new Discord.TextInputBuilder()
        .setCustomId("question2")
        .setLabel("Pergunta 2??")
        .setMaxLength(30)
        .setPlaceholder("Resposta 2:")
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(false)

      const pergunta3 = new Discord.TextInputBuilder()
        .setCustomId("question3")
        .setLabel("Pergunta 3??")
        .setPlaceholder("Resposta 3:")
        .setStyle(Discord.TextInputStyle.Paragraph)
        .setRequired(false)

      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2),
        new Discord.ActionRowBuilder().addComponents(pergunta3)
      )

      await interaction.showModal(modal)
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal") {
      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")
      let resposta3 = interaction.fields.getTextInputValue("pergunta3")

      if (!resposta1) resposta1 = "Não informado."
      if (!resposta2) resposta2 = "Não informado."
      if (!resposta3) resposta3 = "Não informado."

      let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`O usuário ${interaction.user} enviou o formulário abaixo:`)
        .addFields(
          {
            name: `Pergunta 1:`,
            value: `*Resposta 1:* \`${resposta1}\``,
            inline: false
          },
          {
            name: `Pergunta 2:`,
            value: `*Resposta 2:* \`${resposta2}\``,
            inline: false
          },
          {
            name: `Pergunta 3:`,
            value: `*Resposta 3:* \`${resposta3}\``,
            inline: false
          }
        );

      interaction.reply({ content: `Olá **${interaction.user.username}**, seu formulário foi enviado com sucesso!`, flags: Discord.MessageFlags.Ephemeral })
      await interaction.guild.channels.cache.get(await db.get(`log_channel_${interaction.guild.id}`)).send({ embeds: [embed] })
    }
  }
})