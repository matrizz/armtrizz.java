const Discord = require("discord.js")
const db = require("../../lib/utils/db")

module.exports = {
  name: "afk",
  description: "Ative o modo afk.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "motivo",
      description: "Adicione o motivo da inatividade.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    }
  ],

  run: async (client, interaction) => {

    let motivo = interaction.options.getString("motivo");

    let afk_mode = await db.get(`afk_mode${interaction.user.id}`);

    if (afk_mode === true) {
      interaction.reply({ content: `Olá ${interaction.user}, seu modo AFK já está ativado.`, flags: Discord.MessageFlags.Ephemeral })
    } else {
      interaction.reply({ content: `Olá ${interaction.user}, seu modo AFK foi ativado com sucesso!` })
      await db.set(`afk_mode${interaction.user.id}`, true)
      await db.set(`reason_afk_${interaction.user.id}`, motivo)
    }

  }
}