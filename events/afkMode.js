require('../index')

const Discord = require('discord.js')
const client = require('../index')

const db = require("../lib/utils/db")

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (await db.get(`afk_mode${message.author.id}`) === true) {
    message.reply(`Olá ${message.author}, seu modo AFK foi desativado!`)
    await db.delete(`afk_mode${message.author.id}`)
  }

  let afk_user = message.mentions.members.first()
  if (!afk_user) return;

  if (afk_user) {
    let afk_mode = await db.get(`afk_mode${afk_user.id}`);
    if (afk_mode === true) {
      let afk_motivo = await db.get(`reason_afk_${afk_user.id}`);
      message.reply(`Olá ${message.author}, o usuário **${afk_user.user.username}** está com o modo AFK ativado pelo motivo: \`${afk_motivo}\``)
    } else {
      return;
    }
  }
});